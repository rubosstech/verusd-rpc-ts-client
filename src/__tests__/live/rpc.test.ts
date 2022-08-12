import { VerusdRpcInterface } from '../../index'

describe('Makes live API Verusd RPC calls', () => {
  const verusd = new VerusdRpcInterface("https://api.verus.services")

  test('getaddressbalance', async () => {
    expect(
      (
        await verusd.getAddressBalance("VRSCTEST", {
          addresses: ["mike@"],
          friendlynames: true,
        })
      ).error
    ).toBe(null);
  });

  test('getaddressutxos', async () => {
    expect(
      (
        await verusd.getAddressUtxos("VRSCTEST", {
          addresses: ["mike@"],
          friendlynames: true
        })
      ).error
    ).toBe(null);
  });

  test('getaddressdeltas', async () => {
    expect(
      (
        await verusd.getAddressDeltas("VRSCTEST", {
          addresses: ["mike@"],
          friendlynames: true,
          verbosity: 1
        })
      ).error
    ).toBe(null);
  });

  test("getblock", async () => {
    expect((await verusd.getBlock("VRSCTEST", 1)).error).toBe(null);
  });

  test('getidentity', async () => {
    expect(
      (
        await verusd.getIdentity("VRSCTEST", "mike@")
      ).error
    ).toBe(null);
  });

  test('getinfo', async () => {
    expect(
      (
        await verusd.getInfo("VRSCTEST")
      ).error
    ).toBe(null);
  });

  test('getoffers', async () => {
    expect(
      (
        await verusd.getOffers("VRSCTEST", "mike@")
      ).error
    ).toBe(null);
  });

  test('getrawtransaction', async () => {
    expect(
      (
        await verusd.getRawTransaction(
          "VRSCTEST",
          "319018d7a7c31613f7d5d9579a4f5b265b1c6ea01898251b314111e099ec80f1"
        )
      ).error
    ).toBe(null);
  });
});
