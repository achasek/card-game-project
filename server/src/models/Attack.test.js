const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Attack, Card } = require('./index')
const { db } = require('../db/config')

let attack, card

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  attack = await Attack.create({ title: 'Batista Bomb', mojoCost: 1000, staminaCost: 1000 })
  card = await Card.create({ name: 'test', mojo: 99, stamina: 3, imgUrl: 'img.com' })

  await attack.setCards(card)
  await card.setAttacks(attack)
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

  it('has a many-to-many relationship with Card', async () => {
    const associatedCard = await attack.getCards();
    const associatedAttack = await card.getAttacks();
    expect(associatedAttack.length).toEqual(1);
    expect(associatedCard.length).toEqual(1);
  });
})
