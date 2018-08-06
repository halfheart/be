const Card = require('../../../../models/cards');
const Pack = require('../../../../models/packs');

exports.card = (req, res) => {
  const { _id } = req.query;
  console.log(_id);

  Card.findOne({ _id: _id })
  .then((r) => {
    res.send({ success: true, card: r });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}

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

  let f = {}

  Card.find(f)
    .where('type').equals('조사자')
    .select('deckRequirements')
    .then((c) => {
      let nin = []

      c.forEach((i) => {
        i.deckRequirements.forEach((j) => {
          nin.push(j);
        });
      });

      return Card.find(f)
        .where('_id').nin(nin)
        .where('type').ne('조사자');
    })
    .then((c) => {
      cards.array = c;
      res.send({ success: true, cards: cards });
    })
    .catch((err) => {
      res.send({ success: false, msg: err.message });
    });
}

exports.list = (req, res) => {
  let {
    draw,
    skip,
    limit,
    sort,
    order,
    searches,
    columns
  } = req.query;

  if (draw === undefined) res.send({ success: false, msg: 'params err draw' });
  if (skip === undefined) res.send({ success: false, msg: 'params err skip' });
  if (limit === undefined) res.send({ success: false, msg: 'params err limit' });
  if (sort === undefined) res.send({ success: false, msg: 'params err sort' });
  if (order === undefined) res.send({ success: false, msg: 'params err order' });
  if (columns === undefined) res.send({ success: false, msg: 'params err columns' });
  if (searches === undefined) res.send({ success: false, msg: 'params err searches' });

  skip = parseInt(skip);
  limit = parseInt(limit);
  sort = parseInt(sort);

  let cards = {
    cnt: 0,
    draw: draw,
    array: []
  };

  let f = {};

  Card.count(f)
    .where(columns[0]).regex(searches[0])
    .then((c) => {
      cards.cnt = c;
      let s = {};
      s[order] = sort;
      return Card.find(f)
      .where(columns[0]).regex(searches[0])
      .populate('includedPack')
      .populate({
        path: 'deckRequirements',
        populate: {
          path: 'includedPack',
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
    deckRequirements,
    illustrator,
    includedPack,
    number,
    deckOption
  } = req.body

  if (!name) res.send({ success: false, msg: 'params err name' });
  if (!faction) res.send({ success: false, msg: 'params err faction' });
  if (!type) res.send({ success: false, msg: 'params err type' });
  if (!illustrator) res.send({ success: false, msg: 'params err illustrator' });
  if (!includedPack) res.send({ success: false, msg: 'params err includedPack' });
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
    deckRequirements,
    illustrator,
    includedPack,
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
  if (!set.includedPack) res.send({ success: false, msg: 'params err includedPack' });
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
