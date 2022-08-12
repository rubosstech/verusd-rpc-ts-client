"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const verus_typescript_primitives_1 = require("verus-typescript-primitives");
class VerusdRpcInterface {
    constructor(baseURL, config) {
        this.instance = axios_1.default.create(Object.assign({ baseURL, headers: {
                "Content-type": "application/json",
            } }, config));
        this.currid = 0;
    }
    request(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.currid;
            this.currid += 1;
            const body = {
                jsonrpc: "1.0",
                id,
                params: req.getParams(),
                method: req.cmd,
            };
            try {
                const res = yield this.instance.post("/", body);
                if (res.status != 200) {
                    const error = {
                        id,
                        result: null,
                        error: {
                            code: res.status,
                            message: `Network error ${res.status}`,
                            data: res.data,
                        },
                    };
                    return error;
                }
                else {
                    const response = res.data;
                    return response;
                }
            }
            catch (e) {
                const error = {
                    id,
                    result: null,
                    error: {
                        code: -32603,
                        message: e.message,
                    },
                };
                return error;
            }
        });
    }
    getAddressBalance(...args) {
        return this.request(new verus_typescript_primitives_1.GetAddressBalanceRequest(...args));
    }
    getAddressDeltas(...args) {
        return this.request(new verus_typescript_primitives_1.GetAddressDeltasRequest(...args));
    }
    getAddressUtxos(...args) {
        return this.request(new verus_typescript_primitives_1.GetAddressUtxosRequest(...args));
    }
    getBlock(...args) {
        return this.request(new verus_typescript_primitives_1.GetBlockRequest(...args));
    }
    getIdentity(...args) {
        return this.request(new verus_typescript_primitives_1.GetIdentityRequest(...args));
    }
    getInfo(...args) {
        return this.request(new verus_typescript_primitives_1.GetInfoRequest(...args));
    }
    getOffers(...args) {
        return this.request(new verus_typescript_primitives_1.GetOffersRequest(...args));
    }
    getRawTransaction(...args) {
        return this.request(new verus_typescript_primitives_1.GetRawTransactionRequest(...args));
    }
    makeOffer(...args) {
        return this.request(new verus_typescript_primitives_1.MakeOfferRequest(...args));
    }
    sendRawTransaction(...args) {
        return this.request(new verus_typescript_primitives_1.SendRawTransactionRequest(...args));
    }
}
exports.default = VerusdRpcInterface;
