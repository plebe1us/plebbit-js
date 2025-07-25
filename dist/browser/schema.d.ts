import { z } from "zod";
export declare const ChainTickerSchema: z.ZodString;
export declare const nonNegativeIntStringSchema: z.ZodEffects<z.ZodString, string, string>;
export declare const ChainProviderSchema: z.ZodObject<{
    urls: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodEnum<["viem", "ethers.js", "web3.js"]>]>, "many">;
    chainId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    urls: string[];
    chainId: number;
}, {
    urls: string[];
    chainId: number;
}>;
export declare const PlebbitUserOptionBaseSchema: z.ZodObject<{
    ipfsGatewayUrls: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    kuboRpcClientsOptions: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodType<string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined, z.ZodTypeDef, string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined>, "many">, import("kubo-rpc-client").Options[], (string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined)[]>>;
    httpRoutersOptions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    pubsubKuboRpcClientsOptions: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodType<string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined, z.ZodTypeDef, string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined>, "many">, import("kubo-rpc-client").Options[], (string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined)[]>>;
    plebbitRpcClientsOptions: z.ZodOptional<z.ZodArray<z.ZodString, "atleastone">>;
    dataPath: z.ZodOptional<z.ZodString>;
    chainProviders: z.ZodRecord<z.ZodString, z.ZodObject<{
        urls: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodEnum<["viem", "ethers.js", "web3.js"]>]>, "many">;
        chainId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        urls: string[];
        chainId: number;
    }, {
        urls: string[];
        chainId: number;
    }>>;
    resolveAuthorAddresses: z.ZodBoolean;
    publishInterval: z.ZodNumber;
    updateInterval: z.ZodNumber;
    noData: z.ZodBoolean;
    validatePages: z.ZodBoolean;
    userAgent: z.ZodString;
    libp2pJsClientsOptions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        libp2pOptions: z.ZodType<Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>, z.ZodTypeDef, Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>>;
        heliaOptions: z.ZodType<Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>, z.ZodTypeDef, Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        libp2pOptions: Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>;
        heliaOptions?: Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>;
    }, {
        key: string;
        libp2pOptions: Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>;
        heliaOptions?: Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    userAgent: string;
    chainProviders: Record<string, {
        urls: string[];
        chainId: number;
    }>;
    resolveAuthorAddresses: boolean;
    publishInterval: number;
    updateInterval: number;
    noData: boolean;
    validatePages: boolean;
    ipfsGatewayUrls?: string[] | undefined;
    kuboRpcClientsOptions?: import("kubo-rpc-client").Options[] | undefined;
    httpRoutersOptions?: string[] | undefined;
    pubsubKuboRpcClientsOptions?: import("kubo-rpc-client").Options[] | undefined;
    plebbitRpcClientsOptions?: [string, ...string[]] | undefined;
    dataPath?: string | undefined;
    libp2pJsClientsOptions?: {
        key: string;
        libp2pOptions: Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>;
        heliaOptions?: Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>;
    }[] | undefined;
}, {
    userAgent: string;
    chainProviders: Record<string, {
        urls: string[];
        chainId: number;
    }>;
    resolveAuthorAddresses: boolean;
    publishInterval: number;
    updateInterval: number;
    noData: boolean;
    validatePages: boolean;
    ipfsGatewayUrls?: string[] | undefined;
    kuboRpcClientsOptions?: (string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined)[] | undefined;
    httpRoutersOptions?: string[] | undefined;
    pubsubKuboRpcClientsOptions?: (string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined)[] | undefined;
    plebbitRpcClientsOptions?: [string, ...string[]] | undefined;
    dataPath?: string | undefined;
    libp2pJsClientsOptions?: {
        key: string;
        libp2pOptions: Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>;
        heliaOptions?: Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>;
    }[] | undefined;
}>;
export declare const PlebbitUserOptionsSchema: z.ZodEffects<z.ZodObject<{
    kuboRpcClientsOptions: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodType<string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined, z.ZodTypeDef, string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined>, "many">, import("kubo-rpc-client").Options[], (string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined)[]>>;
    plebbitRpcClientsOptions: z.ZodOptional<z.ZodArray<z.ZodString, "atleastone">>;
    dataPath: z.ZodOptional<z.ZodString>;
    libp2pJsClientsOptions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        libp2pOptions: z.ZodType<Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>, z.ZodTypeDef, Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>>;
        heliaOptions: z.ZodType<Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>, z.ZodTypeDef, Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        libp2pOptions: Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>;
        heliaOptions?: Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>;
    }, {
        key: string;
        libp2pOptions: Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>;
        heliaOptions?: Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>;
    }>, "many">>;
} & {
    ipfsGatewayUrls: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>, string[], string[] | undefined>;
    pubsubKuboRpcClientsOptions: z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodType<string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined, z.ZodTypeDef, string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined>, "many">, import("kubo-rpc-client").Options[], (string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined)[]>>>;
    httpRoutersOptions: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    chainProviders: z.ZodEffects<z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
        urls: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodEnum<["viem", "ethers.js", "web3.js"]>]>, "many">;
        chainId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        urls: string[];
        chainId: number;
    }, {
        urls: string[];
        chainId: number;
    }>>>, {
        eth: {
            urls: string[];
            chainId: number;
        };
        avax: {
            urls: string[];
            chainId: number;
        };
        matic: {
            urls: string[];
            chainId: number;
        };
        sol: {
            urls: string[];
            chainId: number;
        };
    }, Record<string, {
        urls: string[];
        chainId: number;
    }> | undefined>;
    resolveAuthorAddresses: z.ZodDefault<z.ZodBoolean>;
    publishInterval: z.ZodDefault<z.ZodNumber>;
    updateInterval: z.ZodDefault<z.ZodNumber>;
    noData: z.ZodDefault<z.ZodBoolean>;
    validatePages: z.ZodDefault<z.ZodBoolean>;
    userAgent: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userAgent: string;
    ipfsGatewayUrls: string[];
    httpRoutersOptions: string[];
    pubsubKuboRpcClientsOptions: import("kubo-rpc-client").Options[];
    chainProviders: {
        eth: {
            urls: string[];
            chainId: number;
        };
        avax: {
            urls: string[];
            chainId: number;
        };
        matic: {
            urls: string[];
            chainId: number;
        };
        sol: {
            urls: string[];
            chainId: number;
        };
    };
    resolveAuthorAddresses: boolean;
    publishInterval: number;
    updateInterval: number;
    noData: boolean;
    validatePages: boolean;
    kuboRpcClientsOptions?: import("kubo-rpc-client").Options[] | undefined;
    plebbitRpcClientsOptions?: [string, ...string[]] | undefined;
    dataPath?: string | undefined;
    libp2pJsClientsOptions?: {
        key: string;
        libp2pOptions: Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>;
        heliaOptions?: Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>;
    }[] | undefined;
}, {
    userAgent?: string | undefined;
    ipfsGatewayUrls?: string[] | undefined;
    kuboRpcClientsOptions?: (string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined)[] | undefined;
    httpRoutersOptions?: string[] | undefined;
    pubsubKuboRpcClientsOptions?: (string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined)[] | undefined;
    plebbitRpcClientsOptions?: [string, ...string[]] | undefined;
    dataPath?: string | undefined;
    chainProviders?: Record<string, {
        urls: string[];
        chainId: number;
    }> | undefined;
    resolveAuthorAddresses?: boolean | undefined;
    publishInterval?: number | undefined;
    updateInterval?: number | undefined;
    noData?: boolean | undefined;
    validatePages?: boolean | undefined;
    libp2pJsClientsOptions?: {
        key: string;
        libp2pOptions: Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>;
        heliaOptions?: Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>;
    }[] | undefined;
}>, {
    pubsubKuboRpcClientsOptions: z.infer<typeof PlebbitUserOptionBaseSchema.shape.pubsubKuboRpcClientsOptions>;
    userAgent: string;
    ipfsGatewayUrls: string[];
    httpRoutersOptions: string[];
    chainProviders: {
        eth: {
            urls: string[];
            chainId: number;
        };
        avax: {
            urls: string[];
            chainId: number;
        };
        matic: {
            urls: string[];
            chainId: number;
        };
        sol: {
            urls: string[];
            chainId: number;
        };
    };
    resolveAuthorAddresses: boolean;
    publishInterval: number;
    updateInterval: number;
    noData: boolean;
    validatePages: boolean;
    kuboRpcClientsOptions?: import("kubo-rpc-client").Options[] | undefined;
    plebbitRpcClientsOptions?: [string, ...string[]] | undefined;
    dataPath?: string | undefined;
    libp2pJsClientsOptions?: {
        key: string;
        libp2pOptions: Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>;
        heliaOptions?: Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>;
    }[] | undefined;
}, {
    userAgent?: string | undefined;
    ipfsGatewayUrls?: string[] | undefined;
    kuboRpcClientsOptions?: (string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined)[] | undefined;
    httpRoutersOptions?: string[] | undefined;
    pubsubKuboRpcClientsOptions?: (string | URL | import("@multiformats/multiaddr").Multiaddr | import("kubo-rpc-client").Options | undefined)[] | undefined;
    plebbitRpcClientsOptions?: [string, ...string[]] | undefined;
    dataPath?: string | undefined;
    chainProviders?: Record<string, {
        urls: string[];
        chainId: number;
    }> | undefined;
    resolveAuthorAddresses?: boolean | undefined;
    publishInterval?: number | undefined;
    updateInterval?: number | undefined;
    noData?: boolean | undefined;
    validatePages?: boolean | undefined;
    libp2pJsClientsOptions?: {
        key: string;
        libp2pOptions: Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>;
        heliaOptions?: Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>;
    }[] | undefined;
}>;
export declare const PlebbitParsedOptionsSchema: z.ZodObject<{
    ipfsGatewayUrls: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    httpRoutersOptions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    plebbitRpcClientsOptions: z.ZodOptional<z.ZodArray<z.ZodString, "atleastone">>;
    dataPath: z.ZodOptional<z.ZodString>;
    chainProviders: z.ZodRecord<z.ZodString, z.ZodObject<{
        urls: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodEnum<["viem", "ethers.js", "web3.js"]>]>, "many">;
        chainId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        urls: string[];
        chainId: number;
    }, {
        urls: string[];
        chainId: number;
    }>>;
    resolveAuthorAddresses: z.ZodBoolean;
    publishInterval: z.ZodNumber;
    updateInterval: z.ZodNumber;
    noData: z.ZodBoolean;
    validatePages: z.ZodBoolean;
    userAgent: z.ZodString;
    libp2pJsClientsOptions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        libp2pOptions: z.ZodType<Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>, z.ZodTypeDef, Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>>;
        heliaOptions: z.ZodType<Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>, z.ZodTypeDef, Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        libp2pOptions: Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>;
        heliaOptions?: Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>;
    }, {
        key: string;
        libp2pOptions: Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>;
        heliaOptions?: Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>;
    }>, "many">>;
} & {
    kuboRpcClientsOptions: z.ZodOptional<z.ZodType<import("kubo-rpc-client").Options[], z.ZodTypeDef, import("kubo-rpc-client").Options[]>>;
    pubsubKuboRpcClientsOptions: z.ZodOptional<z.ZodType<import("kubo-rpc-client").Options[], z.ZodTypeDef, import("kubo-rpc-client").Options[]>>;
}, "strict", z.ZodTypeAny, {
    userAgent: string;
    chainProviders: Record<string, {
        urls: string[];
        chainId: number;
    }>;
    resolveAuthorAddresses: boolean;
    publishInterval: number;
    updateInterval: number;
    noData: boolean;
    validatePages: boolean;
    ipfsGatewayUrls?: string[] | undefined;
    kuboRpcClientsOptions?: import("kubo-rpc-client").Options[] | undefined;
    httpRoutersOptions?: string[] | undefined;
    pubsubKuboRpcClientsOptions?: import("kubo-rpc-client").Options[] | undefined;
    plebbitRpcClientsOptions?: [string, ...string[]] | undefined;
    dataPath?: string | undefined;
    libp2pJsClientsOptions?: {
        key: string;
        libp2pOptions: Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>;
        heliaOptions?: Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>;
    }[] | undefined;
}, {
    userAgent: string;
    chainProviders: Record<string, {
        urls: string[];
        chainId: number;
    }>;
    resolveAuthorAddresses: boolean;
    publishInterval: number;
    updateInterval: number;
    noData: boolean;
    validatePages: boolean;
    ipfsGatewayUrls?: string[] | undefined;
    kuboRpcClientsOptions?: import("kubo-rpc-client").Options[] | undefined;
    httpRoutersOptions?: string[] | undefined;
    pubsubKuboRpcClientsOptions?: import("kubo-rpc-client").Options[] | undefined;
    plebbitRpcClientsOptions?: [string, ...string[]] | undefined;
    dataPath?: string | undefined;
    libp2pJsClientsOptions?: {
        key: string;
        libp2pOptions: Partial<import("libp2p").Libp2pInit<import("helia").DefaultLibp2pServices> & {
            start?: boolean;
        } & Required<Pick<import("libp2p").Libp2pOptions<import("helia").DefaultLibp2pServices>, "services">>>;
        heliaOptions?: Partial<Partial<import("helia").HeliaInit<import("libp2p").Libp2p<import("helia").DefaultLibp2pServices>>> | undefined>;
    }[] | undefined;
}>;
