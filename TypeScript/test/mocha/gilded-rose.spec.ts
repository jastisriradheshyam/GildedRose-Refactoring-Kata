import { expect } from "chai";
import { Item, GildedRose } from "../../app/gilded-rose";

describe("Gilded Rose", () => {
  it("should degrade by 1 for general products", () => {
    let quality = 50;
    const gildedRose = new GildedRose([new Item("pen", 10, quality)]);
    gildedRose.updateQuality();
    const items = gildedRose.getItems();
    expect(items[0].name).to.equal("pen");
    expect(items[0].quality).to.equal(quality - 1);
  });

  it("should degrade by 2 for products that have passed sell by date", () => {
    let quality = 50;
    const gildedRose = new GildedRose([new Item("pen", 1, quality)]);
    gildedRose.updateQuality();
    const items = gildedRose.getItems();
    expect(items[0].name).to.equal("pen");
    expect(items[0].quality).to.equal(quality - 2);
  });

  it("should not update nither quality or sellby changes for Sulfuras", () => {
    let quality = 80;
    let sellin = 10;
    const gildedRose = new GildedRose([new Item("Sulfuras", sellin, quality)]);
    gildedRose.updateQuality();
    const items = gildedRose.getItems();
    expect(items[0].name).to.equal("Sulfuras");
    expect(items[0].quality).to.equal(quality);
    expect(items[0].sellIn).to.equal(sellin);
  });

  it("should increase quality as sellby decreases for Aged Brie", () => {
    let quality = 30;
    let sellin = 10;
    const gildedRose = new GildedRose([new Item("Aged Brie", sellin, quality)]);
    gildedRose.updateQuality();
    const items = gildedRose.getItems();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].quality).to.equal(quality + 1);
    expect(items[0].sellIn).to.equal(sellin - 1);
  });

  it("should never decrease quality below 0", () => {
    let quality = 0;
    let sellin = 10;
    const gildedRose = new GildedRose([new Item("pen", sellin, quality)]);
    gildedRose.updateQuality();
    const items = gildedRose.getItems();
    expect(items[0].name).to.equal("pen");
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(sellin - 1);
  });

  it("should degrade quality by 2 for Conjured as sellin decreases", () => {
    let quality = 10;
    let sellin = 10;
    const gildedRose = new GildedRose([new Item("Conjured", sellin, quality)]);
    gildedRose.updateQuality();
    const items = gildedRose.getItems();
    expect(items[0].name).to.equal("Conjured");
    expect(items[0].quality).to.equal(quality - 2);
    expect(items[0].sellIn).to.equal(sellin - 1);
  });

  it("should increase quality by 2 for Backstage passes if sellin decreases below 11", () => {
    let quality = 10;
    let sellin = 11;
    const gildedRose = new GildedRose([
      new Item("Backstage passes", sellin, quality),
    ]);
    gildedRose.updateQuality();
    const items = gildedRose.getItems();
    expect(items[0].name).to.equal("Backstage passes");
    expect(items[0].quality).to.equal(quality + 2);
    expect(items[0].sellIn).to.equal(sellin - 1);
  });

  it("should increase quality by 3 for Backstage passes if sellin decreases below 6", () => {
    let quality = 10;
    let sellin = 6;
    const gildedRose = new GildedRose([
      new Item("Backstage passes", sellin, quality),
    ]);
    gildedRose.updateQuality();
    const items = gildedRose.getItems();
    expect(items[0].name).to.equal("Backstage passes");
    expect(items[0].quality).to.equal(quality + 3);
    expect(items[0].sellIn).to.equal(sellin - 1);
  });

  it("should increase quality to 0 for Backstage passes if sellin decreases below  or equal to 0", () => {
    let quality = 10;
    let sellin = 1;
    const gildedRose = new GildedRose([
      new Item("Backstage passes", sellin, quality),
    ]);
    gildedRose.updateQuality();
    const items = gildedRose.getItems();
    expect(items[0].name).to.equal("Backstage passes");
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(sellin - 1);
  });
});
