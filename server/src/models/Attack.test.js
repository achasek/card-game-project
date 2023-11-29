const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Attack } = require('./index')
const { db } = require('../db/config')

let attack

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  attack = await Attack.create({ title: 'Batista Bomb', mojoCost: 1000, staminaCost: 1000 })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Attack', () => {
  it('has an id', async () => {
    expect(attack).toHaveProperty('id')
  })

  it('has the correct name', async () => {
    expect(attack).toHaveProperty('title', 'Batista Bomb')
  })

  it('has the correct mojo', async () => {
    expect(attack).toHaveProperty('mojoCost', 1000)
  })
  
  it('has the correct stamina', async () => {
    expect(attack).toHaveProperty('staminaCost', 1000)
  })
})
