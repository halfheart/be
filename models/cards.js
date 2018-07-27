const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true }, // required
  faction: { type: String, required: true }, // required
  type: { type: String, required: true }, // required
  illustrator: { type: String, required: true }, // required
  includedPack: { type: mongoose.Schema.Types.ObjectId, ref: 'pack', required: true }, // required
  number: { type: Number, required: true }, // required
  subname: { type: String, default: '' },
  img: { type: String, default: '' },
  isUnique: { type: Boolean, default: false },
  doubleFaced: { type: Boolean, default: false },
  backName: { type: String, default: '' },
  backText: { type: String, default: '' },
  backFlavor: { type: String, default: '' },
  backImg: { type: String, default: '' },
  subType: { type: String, default: null },
  cost: { type: Number, default: null },
  xp: { type: Number, default: null },
  trait: [{ type: String, default: null }],
  slot: [{ type: String, default: null }],
  will: { type: Number, default: null },
  int: { type: Number, default: null },
  combat: { type: Number, default: null },
  agi: { type: Number, default: null },
  wild: { type: Number, default: null },
  health: { type: Number, default: null },
  sanity: { type: Number, default: null },
  attack: { type: Number, default: null },
  horror: { type: Number, default: null },
  enemyHP: { type: Number, default: null },
  text: { type: String, default: '' },
  flavor: { type: String, default: '' },
  deckSize: { type: Number, default: null },
  deckOption: [{
      faction: { type: String, default: '' },
      min: { type: Number, default: 0 },
      max: { type: Number, default: 5 }
  }],
  deckRequirements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'card' }]
});

module.exports = mongoose.model('card', cardSchema);
