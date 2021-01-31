import { convert } from "./index";

describe("convert()", () => {
  it("matches snapshots", () => {
    expect(
      convert(`例：76f 34f 22ka+ xh 65ka 52kil 83ka+で先手優勢。
22xhでは\\xgが優った。`)
    ).toMatchInlineSnapshot(`
      "例：☗７六歩☖３四歩☗２二角成☖同飛☗６五角☖５二金左☗８三角成で先手優勢。
      ☖２二同飛では☖同銀が優った。"
    `);
    expect(convert(`77xgra-`)).toMatchInlineSnapshot(`"☗７七同銀右上不成"`);
  });
});
