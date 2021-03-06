const Card = require('../../../../models/cards');
const Pack = require('../../../../models/packs');

exports.card = (req, res) => {
  const { _id } = req.query;

  Card.findOne({ _id: _id })
  .populate('deckReq_ids')
  .then((r) => {
    res.send({ success: true, card: r });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
};

exports.deckSourceList = (req, res) => {
  let {
    id,
    draw
  } = req.query

  if (id === undefined) res.send({ success: false, msg: 'params err id' });
  if (draw === undefined) res.send({ success: false, msg: 'params err draw' });

  let cards = {
    cnt: 0,
    draw: draw,
    array: []
  };
  let q = {
    $or: []
  }
  let nin = [];

  Card.findOne().where('_id').equals(id)
    .select('deckOption')
    .then((c) => {
      c.deckOption.forEach((i) => {
        q.$or.push({
          $and: [
            { faction: i.faction },
            { xp: { $gte: i.min } },
            { xp: { $lte: i.max } }
          ]
        });
      });

      return Card.find()
        .where('type').equals('조사자')
        .select('deckReq_ids');
    })
    .then((c) => {
      c.forEach((i) => {
        i.deckReq_ids.forEach((j) => {
          nin.push(j);
        });
      });

      return Card.find(q)
        .where('type').ne('조사자')
        .where('_id').nin(nin)
        .where('subtype').ne('Basic Weakness')
        .populate('pack_id');
    })
    .then((c) => {
      cards.array = c;
      res.send({ success: true, cards: cards });
    })
    .catch((err) => {
      res.send({ success: false, msg: err.message });
    });
};

exports.list = (req, res) => {
  let {
    draw,
    skip,
    limit,
    sort,
    order,
    query
  } = req.query;

  if (draw === undefined) res.send({ success: false, msg: 'params err draw' });
  if (skip === undefined) res.send({ success: false, msg: 'params err skip' });
  if (limit === undefined) res.send({ success: false, msg: 'params err limit' });
  if (sort === undefined) res.send({ success: false, msg: 'params err sort' });
  if (order === undefined) res.send({ success: false, msg: 'params err order' });
  if (query === undefined) res.send({ success: false, msg: 'params err query' });

  skip = parseInt(skip);
  limit = parseInt(limit);
  sort = parseInt(sort);
  query = JSON.parse(query);

  let cards = {
    cnt: 0,
    draw: draw,
    array: []
  };

  Card.count(query)
    .then((c) => {
      cards.cnt = c;
      let s = {};
      s[order] = sort;
      return Card.find(query)
      .populate('pack_id')
      .populate({
        path: 'deckReq_ids',
        populate: {
          path: 'pack_id',
          select: 'name'
        }
      })
      .sort(s)
      .skip(skip)
      .limit(limit);
    })
    .then((r) => {
      cards.array = r;
      res.send({ success: true, cards: cards});
    })
    .catch((err) => {
      res.send({ success: false, msg: err.message });
    });
};

exports.filter = (req, res) => {
  const {
    excludeTypes,
  } = req.query;

  let cards = {
    array: []
  };

  let query = Card.find();

  if (excludeTypes !== undefined) query = query.where('type').ne(excludeTypes);

  query.then((r) => {
    cards.array = r;
    res.send({ success: true, cards: cards });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
};

exports.add = (req, res) => {
  const {
    name,
    subname,
    faction,
    type,
    subtype,
    isUnique,
    doubleFaced,
    trait,
    slot,
    cost,
    xp,
    will,
    int,
    combat,
    agi,
    wild,
    health,
    sanity,
    text,
    flavor,
    backName,
    backText,
    backFlavor,
    deckSize,
    deckReq_ids,
    illustrator,
    pack_id,
    number,
    deckOption
  } = req.body

  if (!name) res.send({ success: false, msg: 'params err name' });
  if (!faction) res.send({ success: false, msg: 'params err faction' });
  if (!type) res.send({ success: false, msg: 'params err type' });
  if (!illustrator) res.send({ success: false, msg: 'params err illustrator' });
  if (!pack_id) res.send({ success: false, msg: 'params err pack_id' });
  if (!number) res.send({ success: false, msg: 'params err number' });

  const addedCard = new Card({
    name,
    subname,
    faction,
    type,
    subtype,
    isUnique,
    doubleFaced,
    trait,
    slot,
    cost,
    xp,
    will,
    int,
    combat,
    agi,
    wild,
    health,
    sanity,
    text,
    flavor,
    backName,
    backText,
    backFlavor,
    deckSize,
    deckReq_ids,
    illustrator,
    pack_id,
    number,
    deckOption
  });

  addedCard.save()
  .then(() => {
    res.send({ success: true });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message});
  });
};

exports.mod = (req, res) => {
  const set = req.body;

  if (!Object.keys(set).length) res.send({ success: false, msg: 'body not set' });
  if (!set._id) res.send({ success: false, msg: 'params err _id'});
  if (!set.name) res.send({ success: false, msg: 'params err name' });
  if (!set.faction) res.send({ success: false, msg: 'params err faction' });
  if (!set.type) res.send({ success: false, msg: 'params err type' });
  if (!set.illustrator) res.send({ success: false, msg: 'params err illustrator' });
  if (!set.pack_id) res.send({ success: false, msg: 'params err pack_id' });
  if (!set.number) res.send({ success: false, msg: 'params err number' });

  const o = { _id: set._id };
  const modedCard = { $set: set };

  Card.findOneAndUpdate(o, modedCard)
  .then(() => {
    res.send({ success: true });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
};

exports.del = (req, res) => {
  const _id = req.query._id;

  if (!_id) res.send({ success: false, msg: 'params err _id'});

  Card.findOne({ _id: _id })
  .then((r) => {
    if (!r) throw new Error('Card not exists');
    return Card.remove({ _id: _id });
  })
  .then(() => {
    res.send({ success: true });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
};
