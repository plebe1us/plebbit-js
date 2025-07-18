import { expect } from "chai";
import Plebbit from "../../dist/node/index.js";
import { createSubWithNoChallenge, describeSkipIfRpc, resolveWhenConditionIsTrue } from "../../dist/node/test/test-util.js";

import tcpPortUsed from "tcp-port-used";

// TODO calling plebbit.destroy() should stop the address rewriter proxy
describeSkipIfRpc(`Testing HTTP router settings and address rewriter`, async () => {
    const kuboNodeForHttpRouter = "http://localhost:15006/api/v0";
    // default list of http routers to use
    const httpRouterUrls = ["https://routing.lol", "https://peers.pleb.bot"];

    const startPort = 19575;

    let plebbit;

    after(async () => {
        try {
            await plebbit.destroy();
        } catch {}
    });

    it(`Plebbit({kuboRpcClientsOptions}) sets correct default http routers`, async () => {
        const anotherPlebbit = await Plebbit({ kuboRpcClientsOptions: [kuboNodeForHttpRouter], dataPath: undefined });
        expect(anotherPlebbit.httpRoutersOptions).to.deep.equal([
            "https://peers.pleb.bot",
            "https://routing.lol",
            "https://peers.forumindex.com",
            "https://peers.plebpubsub.xyz"
        ]);
        expect(anotherPlebbit.dataPath).to.be.undefined;
        await anotherPlebbit.destroy();
    });

    it(`address rewriter proxy should not be taken before we start plebbit`, async () => {
        for (let i = 0; i < httpRouterUrls.length; i++) expect(await tcpPortUsed.check(startPort + i)).to.be.false;
    });

    it(`Plebbit({kuboRpcClientsOptions, httpRoutersOptions}) will change config of ipfs node`, async () => {
        plebbit = await Plebbit({ kuboRpcClientsOptions: [kuboNodeForHttpRouter], httpRoutersOptions: httpRouterUrls });
        plebbit.on("error", (err) => {
            console.log("Received an error on Plebbit instance", err);
        });
        await new Promise((resolve) => setTimeout(resolve, 5000)); // wait unti plebbit is done changing config and restarting
        expect(plebbit.httpRoutersOptions).to.deep.equal(httpRouterUrls);
        const kuboRpcClient = plebbit.clients.kuboRpcClients[kuboNodeForHttpRouter]._client;
        const configValueType = await kuboRpcClient.config.get("Routing.Type");
        expect(configValueType).to.equal("custom");

        const configValueMethods = await kuboRpcClient.config.get("Routing.Methods");
        expect(configValueMethods?.["find-peers"]).to.be.a("object");

        const configValueRouters = await kuboRpcClient.config.get("Routing.Routers");
        expect(configValueRouters?.["HttpRouter1"]).to.be.a("object");
    });

    it(`Should start up address rewriter proxy`, async () => {
        for (let i = 0; i < httpRouterUrls.length; i++) expect(await tcpPortUsed.check(startPort + i)).to.be.true;
    });

    it(`Routing.Routers should be set to proxy`, async () => {
        const kuboRpcClient = plebbit.clients.kuboRpcClients[kuboNodeForHttpRouter]._client;
        const configValueRouters = await kuboRpcClient.config.get("Routing.Routers");
        for (let i = 0; i < httpRouterUrls.length; i++) {
            const endpoint = configValueRouters[`HttpRouter${i + 1}`].Parameters.Endpoint;
            expect(endpoint).to.equal(`http://127.0.0.1:${startPort + i}`);
        }
    });

    it(`Can create another plebbit instance with same configs with no problem`, async () => {
        const anotherInstance = await Plebbit({
            kuboRpcClientsOptions: [kuboNodeForHttpRouter],
            httpRoutersOptions: httpRouterUrls,
            dataPath: plebbit.dataPath
        });
        anotherInstance.on("error", (err) => {
            console.log("Received an error on Plebbit instance", err);
        });
        const kuboRpcClient = anotherInstance.clients.kuboRpcClients[kuboNodeForHttpRouter]._client;
        const configValueRouters = await kuboRpcClient.config.get("Routing.Routers");
        for (let i = 0; i < httpRouterUrls.length; i++) {
            const endpoint = configValueRouters[`HttpRouter${i + 1}`].Parameters.Endpoint;
            expect(endpoint).to.equal(`http://127.0.0.1:${startPort + i}`);
        }

        await anotherInstance.destroy();
    });

    it(`The proxy proxies requests to http router properly`, async () => {
        const sub = await createSubWithNoChallenge({}, plebbit); // an online sub

        await sub.start();
        await resolveWhenConditionIsTrue(sub, () => typeof sub.updatedAt === "number");
        await new Promise((resolve) => setTimeout(resolve, 2000)); // wait till it's propgated on the http router

        for (const httpRouterUrl of httpRouterUrls) {
            // why does subplebbit.ipnsPubsubDhtKey fails here?
            const provideToTestAgainst = [sub.updateCid, sub.pubsubTopicRoutingCid];
            for (const resourceToProvide of provideToTestAgainst) {
                const providersUrl = `${httpRouterUrl}/routing/v1/providers/${resourceToProvide}`;
                const res = await fetch(providersUrl, { method: "GET" });
                expect(res.status).to.equal(200);
                const resJson = await res.json();
                expect(resJson["Providers"]).to.be.a("array");
                expect(resJson["Providers"].length).to.be.at.least(1);
                for (const provider of resJson["Providers"]) {
                    for (const providerAddr of provider.Addrs) {
                        expect(providerAddr).to.be.a.string;
                        expect(providerAddr).to.not.include("0.0.0.0");
                    }
                }
            }
        }

        await sub.delete();
    });

    it(`Calling plebbit.destroy() on original plebbit instance that started address rewriter proxy frees up the proxy server`, async () => {
        await plebbit.destroy();
        for (let i = 0; i < httpRouterUrls.length; i++) expect(await tcpPortUsed.check(startPort + i)).to.be.false;
    });

    it(`Creating a new plebbit instance will start a new proxy server after destroying the previous one`, async () => {
        const anotherInstance = await Plebbit({
            kuboRpcClientsOptions: [kuboNodeForHttpRouter],
            httpRoutersOptions: httpRouterUrls,
            dataPath: plebbit.dataPath
        });

        await new Promise((resolve) => setTimeout(resolve, 5000)); // wait unti plebbit is done changing config and restarting
        for (let i = 0; i < httpRouterUrls.length; i++) expect(await tcpPortUsed.check(startPort + i)).to.be.true;

        await anotherInstance.destroy();

        for (let i = 0; i < httpRouterUrls.length; i++) expect(await tcpPortUsed.check(startPort + i)).to.be.false;
    });
});
