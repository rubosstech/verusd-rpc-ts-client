import { AxiosInstance, AxiosRequestConfig } from "axios";
import { GetAddressBalanceRequest, ApiRequest, GetAddressDeltasRequest, GetAddressUtxosRequest, GetBlockRequest, GetIdentityRequest, GetInfoRequest, GetOffersRequest, GetRawTransactionRequest, MakeOfferRequest, SendRawTransactionRequest } from "verus-typescript-primitives";
import { RpcRequestResult } from "./types/RpcRequest";
declare class VerusdRpcInterface {
    instance: AxiosInstance;
    currid: number;
    constructor(baseURL: string, config?: AxiosRequestConfig);
    request(req: ApiRequest): Promise<RpcRequestResult>;
    getAddressBalance(...args: ConstructorParameters<typeof GetAddressBalanceRequest>): Promise<RpcRequestResult>;
    getAddressDeltas(...args: ConstructorParameters<typeof GetAddressDeltasRequest>): Promise<RpcRequestResult>;
    getAddressUtxos(...args: ConstructorParameters<typeof GetAddressUtxosRequest>): Promise<RpcRequestResult>;
    getBlock(...args: ConstructorParameters<typeof GetBlockRequest>): Promise<RpcRequestResult>;
    getIdentity(...args: ConstructorParameters<typeof GetIdentityRequest>): Promise<RpcRequestResult>;
    getInfo(...args: ConstructorParameters<typeof GetInfoRequest>): Promise<RpcRequestResult>;
    getOffers(...args: ConstructorParameters<typeof GetOffersRequest>): Promise<RpcRequestResult>;
    getRawTransaction(...args: ConstructorParameters<typeof GetRawTransactionRequest>): Promise<RpcRequestResult>;
    makeOffer(...args: ConstructorParameters<typeof MakeOfferRequest>): Promise<RpcRequestResult>;
    sendRawTransaction(...args: ConstructorParameters<typeof SendRawTransactionRequest>): Promise<RpcRequestResult>;
}
export default VerusdRpcInterface;
