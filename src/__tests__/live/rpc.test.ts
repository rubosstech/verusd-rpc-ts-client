import { VerusdRpcInterface } from '../../index'

describe('Makes live API Verusd RPC calls', () => {
  const verusd = new VerusdRpcInterface("VRSCTEST", "https://api.verustest.net/")

  test('getaddressbalance', async () => {
    expect(
      (
        await verusd.getAddressBalance({
          addresses: ["mike@"],
          friendlynames: true,
        })
      ).error
    ).toBe(null);
  });

  test('getaddressutxos', async () => {
    expect(
      (
        await verusd.getAddressUtxos({
          addresses: ["mike@"],
          friendlynames: true
        })
      ).error
    ).toBe(null);
  });

  test('getaddressdeltas', async () => {
    expect(
      (
        await verusd.getAddressDeltas({
          addresses: ["mike@"],
          friendlynames: true,
          verbosity: 1
        })
      ).error
    ).toBe(null);
  });

  test('getaddressmempool', async () => {
    expect(
      (
        await verusd.getAddressMempool({
          addresses: ["mike@"],
          friendlynames: true,
          verbosity: 1
        })
      ).error
    ).toBe(null);
  });

  test("getblock", async () => {
    expect((await verusd.getBlock(1)).error).toBe(null);
  });

  test('getidentity', async () => {
    expect(
      (
        await verusd.getIdentity("mike@")
      ).error
    ).toBe(null);
  });

  test('getinfo', async () => {
    expect(
      (
        await verusd.getInfo()
      ).error
    ).toBe(null);
  });

  test('getoffers', async () => {
    expect(
      (
        await verusd.getOffers("mike@")
      ).error
    ).toBe(null);
  });

  test('getrawtransaction', async () => {
    expect(
      (
        await verusd.getRawTransaction(
          "676ccef766d808a3e7ab60a32226273a15bbce300db6ebea3b944b65043655cf"
        )
      ).error
    ).toBe(null);
  });

  test("getcurrency", async () => {
    expect((await verusd.getCurrency("VRSCTEST")).error).toBe(null);
  });

  test("getvdxfid", async () => {
    expect((await verusd.getVdxfId("test")).error).toBe(null);
  });
});
