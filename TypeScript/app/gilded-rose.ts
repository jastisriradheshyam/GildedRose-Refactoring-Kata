export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  // condition: [
  //   {
  //     itemName;
  //     upgradeOrDegrade: [
  //       {
  //         upgradeOrDegrade: "";
  //         qualityChange: number;
  //       },
  //     ];
  //   },
  // ];

  constructor(items = [] as Array<Item>, condition) {
    this.items = items;
    // this.condition = condition;
  }

  private degradeOrUpgradeQuality(
    item: Item,
    updateType: "degrade" | "upgrade" | "noupdate",
    updateSpeed: number = 1,
    maxQuality: number = 50,
  ) {
    if (updateType == "degrade") {
      if (item.sellIn <= 0) {
        item.quality -= 2;
      } else {
        item.quality -= updateSpeed;
      }
    } else if (updateType == "upgrade") {
      if (item.quality <= maxQuality) {
        item.quality += updateSpeed;
      }
    } else if (updateType == "noupdate") {
    }

    if (item.quality < 0) {
      item.quality = 0;
    }
    if (item.quality > maxQuality) {
      item.quality = maxQuality;
    }
  }
  private reduceSellIn(item: Item) {
    item.sellIn -= 1;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      switch (item.name) {
        case "Aged Brie":
          this.reduceSellIn(item);
          this.degradeOrUpgradeQuality(item, "upgrade");
          break;
        case "Sulfuras":
          break;
        case "Conjured":
          this.reduceSellIn(item);
          this.degradeOrUpgradeQuality(item, "degrade", 2);
          break;
        case "Backstage passes":
          this.reduceSellIn(item);
          if (item.sellIn <= 10 && item.sellIn > 5) {
            this.degradeOrUpgradeQuality(item, "upgrade", 2);
          } else if (item.sellIn <= 5 && item.sellIn > 0) {
            this.degradeOrUpgradeQuality(item, "upgrade", 3);
          } else if (item.sellIn <= 0) {
            item.quality = 0;
          }
          break;
        default:
          this.reduceSellIn(item);
          this.degradeOrUpgradeQuality(item, "degrade");
      }
    }
  }

  getItems(): Array<Item> {
    return this.items;
  }
}
