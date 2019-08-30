const expect = require('chai').expect

const GildedRose = require('../gilded-rose')
const Item = require('../item')

function range(amt) {
  return new Array(amt).fill(0)
}

describe('GildedRose', () => {
  let subject;

  beforeEach(() => {
    subject = new GildedRose()
  })

  describe('normal items', () => {
    beforeEach(() => {
      subject.items.push(new Item('+5 Dexterity Vest', 10, 20))
    })

    it('decrease the sellIn and quality by one', () => {
      range(5).forEach(() => subject.updateQuality())

      expect(subject.items[0].sellIn).to.eql(5)
      expect(subject.items[0].quality).to.eql(15)
    })
    it('allows sellIn to go negative', () => {
      range(11).forEach(() => subject.updateQuality())

      expect(subject.items[0].sellIn).to.eql(-1)
    })
    it('descreases in quality faster (by two) when sellIn goes negative', () => {
      range(12).forEach(() => subject.updateQuality())

      expect(subject.items[0].quality).to.eql(6)
    })
    it('does not allow quality to go negative', () => {
      range(25).forEach(() => subject.updateQuality())

      expect(subject.items[0].quality).to.eql(0)
    })
  })

  describe('Aged Brie', () => {
    beforeEach(() => {
      subject.items.push(new Item('Aged Brie', 3, 0))
    })

    it('increases in quality', () => {
      range(1).forEach(() => subject.updateQuality())

      expect(subject.items[0].sellIn).to.eql(2)
      expect(subject.items[0].quality).to.eql(1)
    })
    it('increases quality by two when sellIn has passed', () => {
      range(5).forEach(() => subject.updateQuality())

      expect(subject.items[0].sellIn).to.eql(-2)
      expect(subject.items[0].quality).to.eql(7)
    })
    it('does not increase past 50 in quality', () => {
      range(55).forEach(() => subject.updateQuality())

      expect(subject.items[0].quality).to.eql(50)
    })
    it('does not allow quality to go over 50', () => {
      subject = new GildedRose()
      subject.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 20, 20))

      range(19).forEach(() => subject.updateQuality())
      expect(subject.items[0].sellIn).to.eql(1)
      expect(subject.items[0].quality).to.eql(50)
    })
  })

  describe('Legendary items', () => {
    beforeEach(() => {
      subject.items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80))
    })

    it('quality and sellIn never change', () => {
      range(5).forEach(() => subject.updateQuality())

      expect(subject.items[0].sellIn).to.eql(0)
      expect(subject.items[0].quality).to.eql(80)
    })
  })

  describe('Backstage passes', () => {
    beforeEach(() => {
      subject.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20))
    })

    it('increases in quality', () => {
      range(5).forEach(() => subject.updateQuality())

      expect(subject.items[0].sellIn).to.eql(10)
      expect(subject.items[0].quality).to.eql(25)
    })
    it('increases in quality by two when there are 10 days or less', () => {
      range(7).forEach(() => subject.updateQuality())

      expect(subject.items[0].sellIn).to.eql(8)
      expect(subject.items[0].quality).to.eql(29)
    })
    it('increases in quality by three when there are 5 days or less', () => {
      range(12).forEach(() => subject.updateQuality())

      expect(subject.items[0].sellIn).to.eql(3)
      expect(subject.items[0].quality).to.eql(41)
    })
    it('quality goes to zero after sellIn expires', () => {
      range(16).forEach(() => subject.updateQuality())

      expect(subject.items[0].sellIn).to.eql(-1)
      expect(subject.items[0].quality).to.eql(0)
    })
  })
})
