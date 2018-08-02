const mongoose = require('mongoose');

const packSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'pack', default: null }
});

const Pack = mongoose.model('pack', packSchema);
module.exports = Pack;

Pack.findOne().where('name').regex('')
  .then((r) => {
    if (r) throw new Error('');
    return Pack.create({"_id":"5b588aa907332121c8e9257d","parent":null,"name":"Core Set","__v":0});
  })
  .then(() => {
    console.log('Core Set created');
  })
  .catch((err) => {
    if (err.message) console.error(`db err Core Set write ${err}`);
  });
