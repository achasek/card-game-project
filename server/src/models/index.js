// const { hasOne, belongsTo, hasMany } = require('sequelize')
const User = require('./User');
const Deck = require('./Deck');
const Card = require('./Card');
const Attack = require('./Attack');

User.hasOne(Deck);
Deck.belongsTo(User);

Card.belongsTo(Deck);
Deck.hasMany(Card);

Card.belongsToMany(Attack, { through : 'cardAttacks'});
Attack.belongsToMany(Card, { through : 'cardAttacks'});
// User to Deck 1-to-1
// Deck to Card 1-to-many
// Card to Attack many-to-many

// and then export them all below
module.exports = { 
    User,
    Deck,
    Card,
    Attack
};
