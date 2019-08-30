function incQuality(item, amount) {
  item.quality = Math.min(item.quality + amount, 50)
}

function decQuality(item, amount) {
  item.quality = Math.max(item.quality - amount, 0)
}

function updateAgedBrie(item) {
  item.sellIn -= 1
  incQuality(item, 1)
  if (item.sellIn < 0)
    incQuality(item, 1)
}

function updateBackstagePass(item) {
  if (item.sellIn >= 0) {
    incQuality(item, 1)
    if (item.sellIn <= 10)
      incQuality(item, 1)
    if (item.sellIn <= 5)
      incQuality(item, 1)
  }

  item.sellIn -= 1

  if (item.sellIn < 0)
    item.quality = 0
}

function updateConjured(item) {
  item.sellIn -= 1
  decQuality(item, 2)
  if (item.sellIn < 0)
    decQuality(item, 2)
}

function updateNormalItem(item) {
  item.sellIn -= 1
  decQuality(item, 1)
  if (item.sellIn < 0)
    decQuality(item, 1)
}

module.exports = class GildedRose {
  constructor() {
    this.items = [] // do not alter this -- Corner Goblin
  }
  updateQuality() {
    this.items.forEach(item => {
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        if (item.name === 'Aged Brie') {
          updateAgedBrie(item)
        } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
          updateBackstagePass(item)
        } else if (item.name.startsWith('Conjured')) {
          updateConjured(item)
        } else {
          updateNormalItem(item)
        }
      }
    })
  }
}
