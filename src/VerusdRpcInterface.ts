import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  GetAddressBalanceRequest,
  ApiRequest,
  GetAddressDeltasRequest,
  GetAddressUtxosRequest,
  GetBlockRequest,
  GetIdentityRequest,
  GetInfoRequest,
  GetOffersRequest,
  GetRawTransactionRequest,
  MakeOfferRequest,
  SendRawTransactionRequest
} from "verus-typescript-primitives";
import { ConstructorParametersAfterFirst, RemoveFirstFromTuple } from "./types/ConstructorParametersAfterFirst";
import { RpcRequestBody, RpcRequestResult, RpcRequestResultError } from "./types/RpcRequest";

class VerusdRpcInterface {
  instance: AxiosInstance;
  currid: number;
  chain: string;

  constructor(chain: string, baseURL: string, config?: AxiosRequestConfig) {
    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-type": "application/json",
      },
      ...config,
    });

    this.currid = 0;
    this.chain = chain;
  }

  async request(req: ApiRequest): Promise<RpcRequestResult> {
    const id = this.currid;
    this.currid += 1;

    const body: RpcRequestBody<number> = {
      jsonrpc: "1.0",
      id,
      params: req.getParams(),
      method: req.cmd,
    };

    try {
      const res: AxiosResponse = await this.instance.post("/", body);

      if (res.status != 200) {
        const error: RpcRequestResultError = {
          id,
          result: null,
          error: {
            code: res.status,
            message: `Network error ${res.status}`,
            data: res.data,
          },
        };

        return error;
      } else {
        const response: RpcRequestResult = res.data as RpcRequestResult;

        return response;
      }
    } catch (e: any) {
      const error: RpcRequestResultError = {
        id,
        result: null,
        error: {
          code: -32603,
          message: e.message as string,
        },
      };

      return error;
    }
  }

  getAddressBalance(...args: ConstructorParametersAfterFirst<typeof GetAddressBalanceRequest>) {
    return this.request(new GetAddressBalanceRequest(this.chain, ...args));
  }

  getAddressDeltas(...args: ConstructorParametersAfterFirst<typeof GetAddressDeltasRequest>) {
    return this.request(new GetAddressDeltasRequest(this.chain, ...args));
  }

  getAddressUtxos(...args: ConstructorParametersAfterFirst<typeof GetAddressUtxosRequest>) {
    return this.request(new GetAddressUtxosRequest(this.chain, ...args));
  }

  getBlock(...args: ConstructorParametersAfterFirst<typeof GetBlockRequest>) {
    return this.request(new GetBlockRequest(this.chain, ...args));
  }

  getIdentity(...args: ConstructorParametersAfterFirst<typeof GetIdentityRequest>) {
    return this.request(new GetIdentityRequest(this.chain, ...args));
  }

  getInfo(...args: ConstructorParametersAfterFirst<typeof GetInfoRequest>) {
    return this.request(new GetInfoRequest(this.chain, ...args));
  }

  getOffers(...args: ConstructorParametersAfterFirst<typeof GetOffersRequest>) {
    return this.request(new GetOffersRequest(this.chain, ...args));
  }

  getRawTransaction(...args: ConstructorParametersAfterFirst<typeof GetRawTransactionRequest>) {
    return this.request(new GetRawTransactionRequest(this.chain, ...args));
  }

  makeOffer(...args: ConstructorParametersAfterFirst<typeof MakeOfferRequest>) {
    return this.request(new MakeOfferRequest(this.chain, ...args));
  }

  sendRawTransaction(...args: ConstructorParametersAfterFirst<typeof SendRawTransactionRequest>) {
    return this.request(new SendRawTransactionRequest(this.chain, ...args));
  }
}

export default VerusdRpcInterface