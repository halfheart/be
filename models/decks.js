const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  name: { type: String, index: true },
  cards: [{
    card: { type: mongoose.Schema.Types.ObjectId, ref: 'cards', required: true },
    qty: { type: Number, default: 1 }
  }],
  ut: { type: Date, default: Date.now }
});

const Deck = mongoose.model('deck', deckSchema);
module.exports = Deck;
