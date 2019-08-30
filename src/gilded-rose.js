function isUnderMaxQuality(item) {
  return item.quality < 50
}

function updateAgedBrie(item) {
  item.sellIn -= 1
  if (isUnderMaxQuality(item)) {
    item.quality += 1
    if (item.sellIn < 0 && isUnderMaxQuality(item))
      item.quality += 1
  }
}

function updateBackstagePass(item) {
  if (item.sellIn >= 0) {
    if (isUnderMaxQuality(item))
      item.quality += 1
    if (item.sellIn <= 10 && isUnderMaxQuality(item))
      item.quality += 1
    if (item.sellIn <= 5 && isUnderMaxQuality(item))
      item.quality += 1
  }

  item.sellIn -= 1

  if (item.sellIn < 0)
    item.quality = 0
}

function updateConjured(item) {
  item.sellIn -= 1
  item.quality -= 2

  if (item.sellIn < 0)
    item.quality -= 2
  if (item.quality < 0)
    item.quality = 0
}

function updateNormalItem(item) {
  item.sellIn -= 1
  if (item.quality > 0)
    item.quality -= 1
  if (item.sellIn < 0 && item.quality > 0)
    item.quality -= 1
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
