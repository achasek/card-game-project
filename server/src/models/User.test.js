const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { User, Deck } = require('./index')
const { db } = require('../db/config')

// define in global scope
let user, deck

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  user = await User.create({ username: 'gandalf' })
  deck = await Deck.create({ name: 'test', xp: 50 })

  await user.setDeck(deck)
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('User', () => {
  it('has an id', async () => {
    expect(user).toHaveProperty('id')
  })

  it('has the correct username', async () => {
    expect(user).toHaveProperty('username', 'gandalf')
  })

  it('has a one-to-one relationship with Deck', async () => {
    const associatedDeck = await user.getDeck();
    expect(associatedDeck.dataValues.name).toEqual('test');
  });
})
