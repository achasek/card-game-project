const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Card } = require('./index')
const { db } = require('../db/config')

let card

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  card = await Card.create({ name: 'Blue Eyes White Dragon', mojo: 99, stamina: 3, imgUrl: 'img.com' })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Card', () => {
  it('has an id', async () => {
    expect(card).toHaveProperty('id')
  })

  it('has the correct name', async () => {
    expect(card).toHaveProperty('name', 'Blue Eyes White Dragon')
  })

  it('has the correct mojo', async () => {
    expect(card).toHaveProperty('mojo', 99)
  })
  
  it('has the correct stamina', async () => {
    expect(card).toHaveProperty('stamina', 3)
  })

  it('has the correct url', async () => {
    expect(card).toHaveProperty('imgUrl', 'img.com')
  })
})
