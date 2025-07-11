import { messages } from "./errors.js";
import type { SubplebbitIpfsType } from "./subplebbit/types.js";
import { CID } from "kubo-rpc-client";
import type { KuboRpcClient } from "./types.js";
import type { AddOptions, AddResult, BlockRmOptions, create as CreateKuboRpcClient, FilesCpOptions } from "kubo-rpc-client";
import type { DecryptedChallengeRequestMessageType, DecryptedChallengeRequestMessageTypeWithSubplebbitAuthor, DecryptedChallengeRequestMessageWithPostSubplebbitAuthor, DecryptedChallengeRequestMessageWithReplySubplebbitAuthor, DecryptedChallengeRequestPublication, PublicationFromDecryptedChallengeRequest, PublicationWithSubplebbitAuthorFromDecryptedChallengeRequest } from "./pubsub-messages/types.js";
import EventEmitter from "events";
import { RemoteSubplebbit } from "./subplebbit/remote-subplebbit.js";
import { Plebbit } from "./plebbit/plebbit.js";
import Logger from "@plebbit/plebbit-logger";
export declare function timestamp(): number;
export declare function replaceXWithY(obj: Record<string, any>, x: any, y: any): any;
export declare function removeNullUndefinedValues<T extends Object>(obj: T): T;
export declare function removeUndefinedValuesRecursively<T>(obj: T): T;
export declare function removeNullUndefinedEmptyObjectsValuesRecursively<T>(obj: T): T;
export declare function throwWithErrorCode(code: keyof typeof messages, details?: {}): void;
export declare const parseDbResponses: (obj: any) => any;
export declare function shortifyAddress(address: string): string;
export declare function shortifyCid(cid: string): string;
export declare function delay(ms: number): Promise<void>;
export declare function firstResolve<T>(promises: Promise<T>[]): Promise<T>;
export declare function getErrorCodeFromMessage(message: string): keyof typeof messages;
export declare function doesDomainAddressHaveCapitalLetter(domainAddress: string): boolean;
export declare function getPostUpdateTimestampRange(postUpdates: SubplebbitIpfsType["postUpdates"], postTimestamp: number): string[];
export declare function isLinkValid(link: string): boolean;
export declare function isLinkOfMedia(link: string): boolean;
export declare function genToArray<T>(gen: AsyncIterable<T>): Promise<T[]>;
export declare function isStringDomain(x: string | undefined): boolean;
export declare function isIpns(x: string): boolean;
export declare function isIpfsCid(x: string): boolean;
export declare function isIpfsPath(x: string): boolean;
export declare function parseIpfsRawOptionToIpfsOptions(kuboRpcRawOption: Parameters<typeof CreateKuboRpcClient>[0]): KuboRpcClient["_clientOptions"];
export declare function hideClassPrivateProps(_this: any): void;
export declare function derivePublicationFromChallengeRequest<T extends Pick<DecryptedChallengeRequestMessageType | DecryptedChallengeRequestMessageTypeWithSubplebbitAuthor | DecryptedChallengeRequestMessageType, keyof DecryptedChallengeRequestPublication>>(request: T): T extends DecryptedChallengeRequestMessageTypeWithSubplebbitAuthor ? PublicationWithSubplebbitAuthorFromDecryptedChallengeRequest : PublicationFromDecryptedChallengeRequest;
export declare function isRequestPubsubPublicationOfReply(request: DecryptedChallengeRequestMessageTypeWithSubplebbitAuthor): request is DecryptedChallengeRequestMessageWithReplySubplebbitAuthor;
export declare function isRequestPubsubPublicationOfPost(request: DecryptedChallengeRequestMessageTypeWithSubplebbitAuthor): request is DecryptedChallengeRequestMessageWithPostSubplebbitAuthor;
export declare function resolveWhenPredicateIsTrue(toUpdate: EventEmitter, predicate: () => Promise<boolean> | boolean, eventName?: string): Promise<void>;
export declare function waitForUpdateInSubInstanceWithErrorAndTimeout(subplebbit: RemoteSubplebbit, timeoutMs: number): Promise<void>;
export declare function calculateIpfsCidV0(content: string): Promise<string>;
/**
 * converts a binary record key to a pubsub topic key
 */
export declare function binaryKeyToPubsubTopic(key: Uint8Array): string;
export declare function ipnsNameToIpnsOverPubsubTopic(ipnsName: string): string;
export declare const pubsubTopicToDhtKey: (pubsubTopic: string) => string;
export declare const pubsubTopicToDhtKeyCid: (pubsubTopic: string) => CID;
export declare function retryKuboIpfsAdd({ ipfsClient: kuboRpcClient, log, content, inputNumOfRetries, options }: {
    ipfsClient: Pick<Plebbit["clients"]["kuboRpcClients"][string]["_client"], "add">;
    log: Logger;
    content: string;
    inputNumOfRetries?: number;
    options?: AddOptions;
}): Promise<AddResult>;
export declare function removeBlocksFromKuboNode({ ipfsClient: kuboRpcClient, log, cids, inputNumOfRetries, options }: {
    ipfsClient: Pick<Plebbit["clients"]["kuboRpcClients"][string]["_client"], "block">;
    log: Logger;
    cids: string[];
    inputNumOfRetries?: number;
    options?: BlockRmOptions;
}): Promise<unknown>;
export declare function removeMfsFilesSafely(kuboRpcClient: Plebbit["clients"]["kuboRpcClients"][string], paths: string[]): Promise<void>;
export declare function ipfsCpWithRmIfFails({ kuboRpcClient, log, src, dest, inputNumOfRetries, options }: {
    kuboRpcClient: Plebbit["clients"]["kuboRpcClients"][string];
    log: Logger;
    src: string;
    dest: string;
    inputNumOfRetries?: number;
    options?: FilesCpOptions;
}): Promise<unknown>;
