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
import { RpcRequestBody, RpcRequestResult, RpcRequestResultError } from "./types/RpcRequest";

class VerusdRpcInterface {
  instance: AxiosInstance;
  currid: number;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-type": "application/json",
      },
      ...config,
    });

    this.currid = 0;
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

  getAddressBalance(...args: ConstructorParameters<typeof GetAddressBalanceRequest>) {
    return this.request(new GetAddressBalanceRequest(...args));
  }

  getAddressDeltas(...args: ConstructorParameters<typeof GetAddressDeltasRequest>) {
    return this.request(new GetAddressDeltasRequest(...args));
  }

  getAddressUtxos(...args: ConstructorParameters<typeof GetAddressUtxosRequest>) {
    return this.request(new GetAddressUtxosRequest(...args));
  }

  getBlock(...args: ConstructorParameters<typeof GetBlockRequest>) {
    return this.request(new GetBlockRequest(...args));
  }

  getIdentity(...args: ConstructorParameters<typeof GetIdentityRequest>) {
    return this.request(new GetIdentityRequest(...args));
  }

  getInfo(...args: ConstructorParameters<typeof GetInfoRequest>) {
    return this.request(new GetInfoRequest(...args));
  }

  getOffers(...args: ConstructorParameters<typeof GetOffersRequest>) {
    return this.request(new GetOffersRequest(...args));
  }

  getRawTransaction(...args: ConstructorParameters<typeof GetRawTransactionRequest>) {
    return this.request(new GetRawTransactionRequest(...args));
  }

  makeOffer(...args: ConstructorParameters<typeof MakeOfferRequest>) {
    return this.request(new MakeOfferRequest(...args));
  }

  sendRawTransaction(...args: ConstructorParameters<typeof SendRawTransactionRequest>) {
    return this.request(new SendRawTransactionRequest(...args));
  }
}

export default VerusdRpcInterface