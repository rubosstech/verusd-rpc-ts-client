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
const flags_1 = require("./utils/flags");
class VerusdRpcInterface {
    constructor(chain, baseURL, config) {
        this.currencycache = new Map();
        this.converterscache = new Map();
        this.listcurrenciescache = new Map();
        this.instance = axios_1.default.create(Object.assign({ baseURL, headers: {
                "Content-type": "application/json",
            } }, config));
        this.currid = 0;
        this.chain = chain;
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
        return this.request(new verus_typescript_primitives_1.GetAddressBalanceRequest(this.chain, ...args));
    }
    getAddressDeltas(...args) {
        return this.request(new verus_typescript_primitives_1.GetAddressDeltasRequest(this.chain, ...args));
    }
    getAddressMempool(...args) {
        return this.request(new verus_typescript_primitives_1.GetAddressMempoolRequest(this.chain, ...args));
    }
    getAddressUtxos(...args) {
        return this.request(new verus_typescript_primitives_1.GetAddressUtxosRequest(this.chain, ...args));
    }
    getBlock(...args) {
        return this.request(new verus_typescript_primitives_1.GetBlockRequest(this.chain, ...args));
    }
    getVdxfId(...args) {
        return this.request(new verus_typescript_primitives_1.GetVdxfIdRequest(this.chain, ...args));
    }
    getIdentity(...args) {
        return this.request(new verus_typescript_primitives_1.GetIdentityRequest(this.chain, ...args));
    }
    getCurrency(...args) {
        return this.request(new verus_typescript_primitives_1.GetCurrencyRequest(this.chain, ...args));
    }
    getInfo(...args) {
        return this.request(new verus_typescript_primitives_1.GetInfoRequest(this.chain, ...args));
    }
    getOffers(...args) {
        return this.request(new verus_typescript_primitives_1.GetOffersRequest(this.chain, ...args));
    }
    getRawTransaction(...args) {
        return this.request(new verus_typescript_primitives_1.GetRawTransactionRequest(this.chain, ...args));
    }
    makeOffer(...args) {
        return this.request(new verus_typescript_primitives_1.MakeOfferRequest(this.chain, ...args));
    }
    sendRawTransaction(...args) {
        return this.request(new verus_typescript_primitives_1.SendRawTransactionRequest(this.chain, ...args));
    }
    fundRawTransaction(...args) {
        return this.request(new verus_typescript_primitives_1.FundRawTransactionRequest(this.chain, ...args));
    }
    sendCurrency(...args) {
        return this.request(new verus_typescript_primitives_1.SendCurrencyRequest(this.chain, ...args));
    }
    getCurrencyConverters(...args) {
        return this.request(new verus_typescript_primitives_1.GetCurrencyConvertersRequest(this.chain, ...args));
    }
    listCurrencies(...args) {
        return this.request(new verus_typescript_primitives_1.ListCurrenciesRequest(this.chain, ...args));
    }
    static extractRpcResult(res) {
        if (res.error)
            throw new Error(res.error.message);
        else
            return res.result;
    }
    getCachedCurrency(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const [iaddr] = args;
            if (this.currencycache.has(iaddr)) {
                return this.currencycache.get(iaddr);
            }
            const response = yield this.request(new verus_typescript_primitives_1.GetCurrencyRequest(this.chain, ...args));
            if (response.result) {
                this.currencycache.set(iaddr, response);
            }
            return response;
        });
    }
    getCachedListCurrencies(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = JSON.stringify(args);
            if (this.listcurrenciescache.has(key)) {
                return this.listcurrenciescache.get(key);
            }
            const response = yield this.request(new verus_typescript_primitives_1.ListCurrenciesRequest(this.chain, ...args));
            if (response.result) {
                this.listcurrenciescache.set(key, response);
            }
            return response;
        });
    }
    getAllCachedListCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            const localCurrencies = VerusdRpcInterface.extractRpcResult(yield this.getCachedListCurrencies({ systemtype: "local" }));
            const pbaasCurrencies = VerusdRpcInterface.extractRpcResult(yield this.getCachedListCurrencies({ systemtype: "pbaas" }));
            const importedCurrencies = VerusdRpcInterface.extractRpcResult(yield this.getCachedListCurrencies({ systemtype: "imported" }));
            return [...localCurrencies, ...pbaasCurrencies, ...importedCurrencies];
        });
    }
    getCachedCurrencyConverters(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = JSON.stringify(args);
            if (this.converterscache.has(key)) {
                return this.converterscache.get(key);
            }
            const response = yield this.request(new verus_typescript_primitives_1.GetCurrencyConvertersRequest(this.chain, ...args));
            if (response.result) {
                const allCurrencies = yield this.getAllCachedListCurrencies();
                const root = (VerusdRpcInterface.extractRpcResult(yield this.getCachedCurrency(this.chain)));
                // Try to cache locally constructed converter responses
                for (const source of allCurrencies) {
                    const sourceDefinition = source.currencydefinition;
                    const converters = [];
                    for (const dest of allCurrencies) {
                        const destDefinition = dest.currencydefinition;
                        if ((0, flags_1.checkFlag)(destDefinition.options, flags_1.IS_FRACTIONAL_FLAG) &&
                            destDefinition.currencies &&
                            destDefinition.currencies.includes(sourceDefinition.currencyid) &&
                            destDefinition.bestcurrencystate) {
                            const targetReserve = destDefinition.bestcurrencystate.reservecurrencies.find(x => x.currencyid === root.currencyid);
                            if (targetReserve && targetReserve.weight > 0.1 && targetReserve.reserves > 1000) {
                                converters.push({
                                    [destDefinition.name]: Object.assign(Object.assign({}, destDefinition), { bestcurrencystate: dest.bestcurrencystate })
                                });
                            }
                        }
                    }
                    const params = [[sourceDefinition.currencyid]];
                    const converterResponse = {
                        id: 0,
                        result: converters,
                        error: null
                    };
                    this.converterscache.set(JSON.stringify(params), converterResponse);
                }
                this.converterscache.set(key, response);
            }
            return response;
        });
    }
    getCurrencyConversionPathsRec(src, dest, includeVia = true, ignoreCurrencies = [], via, root) {
        return __awaiter(this, void 0, void 0, function* () {
            const fractionalSource = (0, flags_1.checkFlag)(src.options, flags_1.IS_FRACTIONAL_FLAG);
            const paths = VerusdRpcInterface.extractRpcResult(yield this.getCachedCurrencyConverters(dest == null ? [src.currencyid] : [src.currencyid, dest.currencyid]));
            let convertables = {};
            function addConvertable(key, convertable) {
                if (convertables[key] == null) {
                    convertables[key] = [convertable];
                }
                else {
                    convertables[key].push(convertable);
                }
            }
            function mergeConvertables(x, y) {
                const merged = {};
                for (const key in x) {
                    if (y[key]) {
                        merged[key] = [...x[key], ...y[key]];
                    }
                    else {
                        merged[key] = x[key];
                    }
                }
                for (const key in y) {
                    if (!merged[key]) {
                        merged[key] = y[key];
                    }
                }
                convertables = merged;
            }
            destination_iterator: for (const path of paths) {
                const currencyName = Object.keys(path)[0];
                const displayName = path[currencyName].fullyqualifiedname;
                let pricingCurrencyState;
                let price;
                let viapriceinroot;
                let destpriceinvia;
                if (via) {
                    if (via.bestcurrencystate) {
                        pricingCurrencyState = via.bestcurrencystate;
                    }
                    else {
                        pricingCurrencyState = (VerusdRpcInterface.extractRpcResult(yield this.getCachedCurrency(via.currencyid))).bestcurrencystate;
                    }
                    // If the pricingCurrency doesn't contain the destination
                    // in it's reserves, we can't use it for via
                    if (pricingCurrencyState.currencies[path[currencyName].currencyid] == null) {
                        continue;
                    }
                    viapriceinroot = 1 / pricingCurrencyState.currencies[root.currencyid].lastconversionprice;
                    destpriceinvia = pricingCurrencyState.currencies[path[currencyName].currencyid].lastconversionprice;
                    price =
                        1 /
                            (pricingCurrencyState.currencies[root.currencyid].lastconversionprice /
                                pricingCurrencyState.currencies[path[currencyName].currencyid]
                                    .lastconversionprice);
                }
                else {
                    if (path[currencyName].bestcurrencystate) {
                        pricingCurrencyState = path[currencyName].bestcurrencystate;
                    }
                    else {
                        pricingCurrencyState = (VerusdRpcInterface.extractRpcResult(yield this.getCachedCurrency(path[currencyName].currencyid))).bestcurrencystate;
                    }
                    price = 1 / pricingCurrencyState.currencies[src.currencyid].lastconversionprice;
                }
                const gateway = (0, flags_1.checkFlag)(path[currencyName].options, flags_1.IS_GATEWAY_FLAG);
                addConvertable(path[currencyName].currencyid, {
                    via,
                    destination: Object.assign(Object.assign({}, path[currencyName]), { name: displayName }),
                    exportto: gateway
                        ? path[currencyName].currencyid
                        : (via == null && path[currencyName].systemid === src.systemid) ||
                            (via != null && via.systemid === root.systemid)
                            ? undefined
                            : via == null
                                ? path[currencyName].currencyid
                                : via.systemid === root.systemid
                                    ? undefined
                                    : via.systemid,
                    price,
                    gateway,
                    viapriceinroot,
                    destpriceinvia
                });
                // If gateway converter, allow converting to same currency, on current system
                if (gateway) {
                    addConvertable(path[currencyName].currencyid, {
                        via,
                        destination: Object.assign(Object.assign({}, path[currencyName]), { name: displayName }),
                        price,
                        gateway: false,
                        viapriceinroot,
                        destpriceinvia
                    });
                }
            }
            if (fractionalSource && dest == null) {
                let price;
                let viapriceinroot;
                let destpriceinvia;
                for (const reserve of src.currencies) {
                    let pricingCurrencyState;
                    if (!ignoreCurrencies.includes(reserve)) {
                        if (via) {
                            if (via.bestcurrencystate) {
                                pricingCurrencyState = via.bestcurrencystate;
                            }
                            else {
                                pricingCurrencyState = (VerusdRpcInterface.extractRpcResult(yield this.getCachedCurrency(via.currencyid))).bestcurrencystate;
                            }
                            viapriceinroot = 1 / pricingCurrencyState.currencies[root.currencyid].lastconversionprice;
                            destpriceinvia = pricingCurrencyState.currencies[reserve].lastconversionprice;
                            price =
                                1 /
                                    (pricingCurrencyState.currencies[root.currencyid]
                                        .lastconversionprice /
                                        pricingCurrencyState.currencies[reserve]
                                            .lastconversionprice);
                        }
                        else {
                            if (src.bestcurrencystate) {
                                pricingCurrencyState = src.bestcurrencystate;
                            }
                            else {
                                pricingCurrencyState = (VerusdRpcInterface.extractRpcResult(yield this.getCachedCurrency(src.currencyid))).bestcurrencystate;
                            }
                            price =
                                pricingCurrencyState.currencies[reserve]
                                    .lastconversionprice;
                        }
                        const _destination = (VerusdRpcInterface.extractRpcResult(yield this.getCachedCurrency(reserve)));
                        const gateway = (0, flags_1.checkFlag)(_destination.options, flags_1.IS_GATEWAY_FLAG);
                        addConvertable(reserve, {
                            via,
                            destination: _destination,
                            exportto: gateway
                                ? _destination.currencyid
                                : (via == null && _destination.systemid === src.systemid) ||
                                    (via != null && via.systemid === root.systemid)
                                    ? undefined
                                    : via == null
                                        ? _destination.currencyid
                                        : via.systemid === root.systemid
                                            ? undefined
                                            : via.systemid,
                            price,
                            viapriceinroot,
                            destpriceinvia,
                            gateway
                        });
                        // If gateway converter, allow converting to same currency, on current system
                        if (gateway) {
                            addConvertable(reserve, {
                                via,
                                destination: _destination,
                                price,
                                gateway: false,
                                viapriceinroot,
                                destpriceinvia
                            });
                        }
                    }
                }
            }
            if (includeVia) {
                for (const key in convertables) {
                    for (const convertablePath of convertables[key]) {
                        if ((0, flags_1.checkFlag)(convertablePath.destination.options, flags_1.IS_FRACTIONAL_FLAG) &&
                            !ignoreCurrencies.includes(key) &&
                            convertablePath.destination.currencies.includes(src.currencyid)) {
                            mergeConvertables(convertables, yield this._getCurrencyConversionPaths(convertablePath.destination, dest, false, ignoreCurrencies, convertablePath.destination, src));
                        }
                    }
                }
            }
            return convertables;
        });
    }
    _getCurrencyConversionPaths(src, dest, includeVia = true, ignoreCurrencies = [], via, root) {
        return __awaiter(this, void 0, void 0, function* () {
            const paths = yield this.getCurrencyConversionPathsRec(src, dest, includeVia, ignoreCurrencies, via, root);
            delete paths[src.currencyid];
            return paths;
        });
    }
    getCurrencyConversionPaths(src, dest, includeVia = true, ignoreCurrencies = [], via, root) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _cache = this.currencycache;
                function cacheDefinition(x) {
                    _cache.set(x.currencyid, {
                        id: 0,
                        result: x,
                        error: null
                    });
                }
                cacheDefinition(src);
                if (dest != null) {
                    cacheDefinition(dest);
                }
                if (via != null) {
                    cacheDefinition(via);
                }
                if (root != null) {
                    cacheDefinition(root);
                }
                const allCurrencies = yield this.getAllCachedListCurrencies();
                for (const currency of allCurrencies) {
                    const definition = Object.assign(Object.assign({}, currency.currencydefinition), { bestcurrencystate: currency.bestcurrencystate });
                    const getCurrencyResponse = {
                        id: 0,
                        result: definition,
                        error: null
                    };
                    this.currencycache.set(definition.currencyid, getCurrencyResponse);
                }
                const result = yield this._getCurrencyConversionPaths(src, dest, includeVia, ignoreCurrencies, via, root);
                this.currencycache.clear();
                this.listcurrenciescache.clear();
                this.converterscache.clear();
                return result;
            }
            catch (e) {
                this.currencycache.clear();
                this.listcurrenciescache.clear();
                this.converterscache.clear();
                throw e;
            }
        });
    }
}
exports.default = VerusdRpcInterface;
