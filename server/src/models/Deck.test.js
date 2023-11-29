const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Deck, Card } = require('./index')
const { db } = require('../db/config')

let deck, card

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  deck = await Deck.create({ name: 'Yugis deck', xp: 50 })
  card1 = await Card.create({ name: 'test1', mojo: 99, stamina: 3, imgUrl: 'img.com' })
  card2 = await Card.create({ name: 'test2', mojo: 99, stamina: 3, imgUrl: 'img.com' })

  await deck.addCards([card1, card2])
  await card1.setDeck(deck)
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Deck', () => {
  it('has an id', async () => {
    expect(deck).toHaveProperty('id')
  })

  it('has the correct username', async () => {
    expect(deck).toHaveProperty('name', 'Yugis deck')
  })

  it('has the correct xp', async () => {
    expect(deck).toHaveProperty('xp', 50)
  })

  it('has a one-to-many relationship with Card', async () => {
    const associatedCard = await deck.getCards();
    const associatedDeck = await card1.getDeck();
    expect(associatedDeck.dataValues.name).toBe('Yugis deck')
    expect(associatedCard.length).toEqual(2);
  });
})
