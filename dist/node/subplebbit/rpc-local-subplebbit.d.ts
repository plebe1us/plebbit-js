import type { RpcInternalSubplebbitRecordAfterFirstUpdateType, RpcInternalSubplebbitRecordBeforeFirstUpdateType, SubplebbitEditOptions, SubplebbitStartedState } from "./types.js";
import { RpcRemoteSubplebbit } from "./rpc-remote-subplebbit.js";
import { Plebbit } from "../plebbit/plebbit.js";
export declare class RpcLocalSubplebbit extends RpcRemoteSubplebbit implements RpcInternalSubplebbitRecordBeforeFirstUpdateType {
    started: boolean;
    startedState: SubplebbitStartedState;
    signer: RpcInternalSubplebbitRecordAfterFirstUpdateType["signer"];
    settings: RpcInternalSubplebbitRecordAfterFirstUpdateType["settings"];
    editable: Pick<RpcLocalSubplebbit, keyof SubplebbitEditOptions>;
    challenges: RpcInternalSubplebbitRecordBeforeFirstUpdateType["challenges"];
    encryption: RpcInternalSubplebbitRecordBeforeFirstUpdateType["encryption"];
    createdAt: RpcInternalSubplebbitRecordBeforeFirstUpdateType["createdAt"];
    protocolVersion: RpcInternalSubplebbitRecordBeforeFirstUpdateType["protocolVersion"];
    private _startRpcSubscriptionId?;
    _usingDefaultChallenge: RpcInternalSubplebbitRecordAfterFirstUpdateType["_usingDefaultChallenge"];
    constructor(plebbit: Plebbit);
    toJSONInternalRpcAfterFirstUpdate(): RpcInternalSubplebbitRecordAfterFirstUpdateType;
    toJSONInternalRpcBeforeFirstUpdate(): RpcInternalSubplebbitRecordBeforeFirstUpdateType;
    initRpcInternalSubplebbitBeforeFirstUpdateNoMerge(newProps: RpcInternalSubplebbitRecordBeforeFirstUpdateType): void;
    initRpcInternalSubplebbitAfterFirstUpdateNoMerge(newProps: RpcInternalSubplebbitRecordAfterFirstUpdateType): void;
    protected _updateRpcClientStateFromStartedState(startedState: RpcLocalSubplebbit["startedState"]): void;
    protected _processUpdateEventFromRpcUpdate(args: any): void;
    private _handleRpcUpdateEventFromStart;
    private _handleRpcStartedStateChangeEvent;
    private _handleRpcChallengeRequestEvent;
    private _handleRpcChallengeEvent;
    private _handleRpcChallengeAnswerEvent;
    private _handleRpcChallengeVerificationEvent;
    start(): Promise<void>;
    private _cleanUpRpcConnection;
    stopWithoutRpcCall(): Promise<void>;
    stop(): Promise<void>;
    edit(newSubplebbitOptions: SubplebbitEditOptions): Promise<typeof this>;
    update(): Promise<void>;
    delete(): Promise<void>;
}
