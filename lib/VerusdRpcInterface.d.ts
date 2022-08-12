import { AxiosInstance, AxiosRequestConfig } from "axios";
import { GetAddressBalanceRequest, ApiRequest, GetAddressDeltasRequest, GetAddressUtxosRequest, GetBlockRequest, GetIdentityRequest, GetInfoRequest, GetOffersRequest, GetRawTransactionRequest, MakeOfferRequest, SendRawTransactionRequest } from "verus-typescript-primitives";
import { ConstructorParametersAfterFirst } from "./types/ConstructorParametersAfterFirst";
import { RpcRequestResult } from "./types/RpcRequest";
declare class VerusdRpcInterface {
    instance: AxiosInstance;
    currid: number;
    chain: string;
    constructor(chain: string, baseURL: string, config?: AxiosRequestConfig);
    request(req: ApiRequest): Promise<RpcRequestResult>;
    getAddressBalance(...args: ConstructorParametersAfterFirst<typeof GetAddressBalanceRequest>): Promise<RpcRequestResult>;
    getAddressDeltas(...args: ConstructorParametersAfterFirst<typeof GetAddressDeltasRequest>): Promise<RpcRequestResult>;
    getAddressUtxos(...args: ConstructorParametersAfterFirst<typeof GetAddressUtxosRequest>): Promise<RpcRequestResult>;
    getBlock(...args: ConstructorParametersAfterFirst<typeof GetBlockRequest>): Promise<RpcRequestResult>;
    getIdentity(...args: ConstructorParametersAfterFirst<typeof GetIdentityRequest>): Promise<RpcRequestResult>;
    getInfo(...args: ConstructorParametersAfterFirst<typeof GetInfoRequest>): Promise<RpcRequestResult>;
    getOffers(...args: ConstructorParametersAfterFirst<typeof GetOffersRequest>): Promise<RpcRequestResult>;
    getRawTransaction(...args: ConstructorParametersAfterFirst<typeof GetRawTransactionRequest>): Promise<RpcRequestResult>;
    makeOffer(...args: ConstructorParametersAfterFirst<typeof MakeOfferRequest>): Promise<RpcRequestResult>;
    sendRawTransaction(...args: ConstructorParametersAfterFirst<typeof SendRawTransactionRequest>): Promise<RpcRequestResult>;
}
export default VerusdRpcInterface;
