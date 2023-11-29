const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Deck } = require('./index')
const { db } = require('../db/config')

let deck

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  deck = await Deck.create({ name: 'Yugis deck', xp: 50 })
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
})
