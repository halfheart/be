const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  name: { type: String, index: true },
  investigator: { type: mongoose.Schema.Types.ObjectId, ref: 'card', required: true },
  cards: [{
    card: { type: mongoose.Schema.Types.ObjectId, ref: 'card', required: true },
    qty: { type: Number, default: 1 },
    require: { type: Boolean, default: false }
  }],
  ut: { type: Date, default: Date.now }
});

const Deck = mongoose.model('deck', deckSchema);
module.exports = Deck;
