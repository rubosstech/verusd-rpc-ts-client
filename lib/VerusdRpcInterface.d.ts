import { AxiosInstance, AxiosRequestConfig } from "axios";
import { GetAddressBalanceRequest, ApiRequest, GetAddressDeltasRequest, GetAddressUtxosRequest, GetBlockRequest, GetIdentityRequest, GetInfoRequest, GetOffersRequest, GetRawTransactionRequest, MakeOfferRequest, SendRawTransactionRequest, GetCurrencyRequest, GetAddressMempoolRequest, GetVdxfIdRequest, FundRawTransactionRequest, SendCurrencyRequest, GetCurrencyConvertersRequest } from "verus-typescript-primitives";
import { ConstructorParametersAfterFirst } from "./types/ConstructorParametersAfterFirst";
import { RpcRequestResult } from "./types/RpcRequest";
declare class VerusdRpcInterface {
    instance: AxiosInstance;
    currid: number;
    chain: string;
    constructor(chain: string, baseURL: string, config?: AxiosRequestConfig);
    request<D>(req: ApiRequest): Promise<RpcRequestResult<D>>;
    getAddressBalance(...args: ConstructorParametersAfterFirst<typeof GetAddressBalanceRequest>): Promise<RpcRequestResult<{
        balance: number;
        received: number;
        currencybalance: {
            [key: string]: number;
        };
        currencyreceived: {
            [key: string]: number;
        };
        currencynames: {
            [key: string]: string;
        };
    }, any>>;
    getAddressDeltas(...args: ConstructorParametersAfterFirst<typeof GetAddressDeltasRequest>): Promise<RpcRequestResult<{
        satoshis: number;
        txid: string;
        index: number;
        blockindex: number;
        height: number;
        address: string;
        currencyvalues?: {
            [key: string]: number;
        } | undefined;
        currencynames?: {
            [key: string]: string;
        } | undefined;
        sent?: {
            outputs: {
                addresses: string | string[];
                amounts: {
                    [key: string]: number;
                };
            }[];
        } | undefined;
    }[], any>>;
    getAddressMempool(...args: ConstructorParametersAfterFirst<typeof GetAddressMempoolRequest>): Promise<RpcRequestResult<{
        satoshis: number;
        txid: string;
        index: number;
        blockindex: number;
        height: number;
        address: string;
        currencyvalues?: {
            [key: string]: number;
        } | undefined;
        currencynames?: {
            [key: string]: string;
        } | undefined;
        sent?: {
            outputs: {
                addresses: string | string[];
                amounts: {
                    [key: string]: number;
                };
            }[];
        } | undefined;
    }[], any>>;
    getAddressUtxos(...args: ConstructorParametersAfterFirst<typeof GetAddressUtxosRequest>): Promise<RpcRequestResult<{
        address: string;
        txid: string;
        outputIndex: number;
        script: string;
        currencyvalues: {
            [key: string]: number;
        };
        currencynames: {
            [key: string]: string;
        };
        satoshis: number;
        height: number;
        isspendable: number;
        blocktime: number;
    }[], any>>;
    getBlock(...args: ConstructorParametersAfterFirst<typeof GetBlockRequest>): Promise<RpcRequestResult<string | import("verus-typescript-primitives/dist/block/BlockInfo").BlockInfo, any>>;
    getVdxfId(...args: ConstructorParametersAfterFirst<typeof GetVdxfIdRequest>): Promise<RpcRequestResult<{
        vdxfid: string;
        hash160result: string;
        qualifiedname: {
            name: string;
            parentid: string;
        };
        bounddata?: {
            vdxfkey: string;
            uint256: string;
            indexnum: string;
        } | undefined;
    }, any>>;
    getIdentity(...args: ConstructorParametersAfterFirst<typeof GetIdentityRequest>): Promise<RpcRequestResult<{
        identity: import("verus-typescript-primitives").IdentityDefinition;
        status: string;
        canspendfor: boolean;
        cansignfor: boolean;
        blockheight: number;
        txid: string;
        vout: number;
        proof?: string | undefined;
    }, any>>;
    getCurrency(...args: ConstructorParametersAfterFirst<typeof GetCurrencyRequest>): Promise<RpcRequestResult<import("verus-typescript-primitives").CurrencyDefinition, any>>;
    getInfo(...args: ConstructorParametersAfterFirst<typeof GetInfoRequest>): Promise<RpcRequestResult<{
        version: number;
        protocolversion: number;
        VRSCversion: string;
        notarized: number;
        prevMoMheight: number;
        notarizedhash: string;
        notarizedtxid: string;
        notarizedtxid_height: string;
        KMDnotarized_height: number;
        notarized_confirms: number;
        blocks: number;
        longestchain: number;
        timeoffset: number;
        tiptime: number;
        connections: number;
        proxy: string;
        difficulty: number;
        testnet: boolean;
        paytxfee: number;
        relayfee: number;
        errors: string;
        CCid: number;
        name: string;
        p2pport: number;
        rpcport: number;
        magic: number;
        premine: number;
        eras: number;
        reward: string;
        halving: string;
        decay: string;
        endsubsidy: string;
        veruspos: number;
    }, any>>;
    getOffers(...args: ConstructorParametersAfterFirst<typeof GetOffersRequest>): Promise<RpcRequestResult<import("verus-typescript-primitives/dist/offers/OfferList").OfferList, any>>;
    getRawTransaction(...args: ConstructorParametersAfterFirst<typeof GetRawTransactionRequest>): Promise<RpcRequestResult<string | import("verus-typescript-primitives/dist/transaction/RawTransaction").RawTransaction, any>>;
    makeOffer(...args: ConstructorParametersAfterFirst<typeof MakeOfferRequest>): Promise<RpcRequestResult<{
        txid?: string | undefined;
        hex?: string | undefined;
    }, any>>;
    sendRawTransaction(...args: ConstructorParametersAfterFirst<typeof SendRawTransactionRequest>): Promise<RpcRequestResult<string | import("verus-typescript-primitives/dist/transaction/RawTransaction").RawTransaction, any>>;
    fundRawTransaction(...args: ConstructorParametersAfterFirst<typeof FundRawTransactionRequest>): Promise<RpcRequestResult<{
        hex: string;
        changepos: number;
        fee: number;
    }, any>>;
    sendCurrency(...args: ConstructorParametersAfterFirst<typeof SendCurrencyRequest>): Promise<RpcRequestResult<string | {
        outputtotals: {
            [currencyid: string]: number;
        };
        feeamount: number;
        hextx: string;
    }, any>>;
    getCurrencyConverters(...args: ConstructorParametersAfterFirst<typeof GetCurrencyConvertersRequest>): Promise<RpcRequestResult<{
        [key: string]: import("verus-typescript-primitives").CurrencyDefinition;
    }[], any>>;
}
export default VerusdRpcInterface;
