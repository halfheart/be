const Deck = require('../../../../models/decks');

exports.deck = (req, res) => {
  let { id } = req.query;

  if (id === undefined) res.send({ success: false, msg: 'params err id' });

  Deck.findOne({ _id: id })
  .populate('investigator_id')
  .populate('cards.card_id')
  .populate('author_id')
  .then((r) => {
    res.send({ success: true, deck: r });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}

exports.list = (req, res) => {
  let {
    draw,
    sort,
    order,
    query,
    limit,
    skip
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

  let decks = {
    cnt: 0,
    draw: draw,
    array: []
  };

  Deck.count(query)
  .then((c) => {
    decks.cnt = c;
    let s = {};
    s[order] = sort;
    return Deck.find(query)
      .populate('investigator_id')
      .populate('author_id')
      .sort(s)
      .skip(skip)
      .limit(limit);
  })
  .then((r) => {
    decks.array = r;
    res.send({ success: true, decks: decks });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}

exports.del = (req, res) => {
  const { _id } = req.query;

  if (_id === undefined) res.send({ success: false, msg: 'params err id' });

  Deck.findOne({ _id: _id })
  .then((r) => {
    if (!r) throw new Error('Deck not exists');
    return Deck.remove({ _id: _id });
  })
  .then(() => {
    res.send({ success: true });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}

exports.mod = (req, res) => {
  const {
    _id,
    name,
    investigator,
    cards
  } = req.body;

  if (!name) res.send({ success: false, msg: 'params err name' });
  if (!investigator) res.send({ success: false, msg: 'params err investigator' });

  let cardArray = [];

  cards.forEach((i, index) => {
    if (index === 0) return
    cardArray.push({
      card_id: i.card._id,
      qty: i.qty,
      require: i.require
    });
  });

  const o = { _id: _id };
  const modedDeck = {
    _id: _id,
    name: name,
    investigator_id: investigator._id,
    cards: cardArray
  };

  Deck.findOneAndUpdate(o, modedDeck)
  .then((r) => {
    res.send({ success: true, id: r.id });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}

exports.add = (req, res) => {
  const {
    name,
    author,
    investigator,
    cards
  } = req.body;

  if (!name) res.send({ success: false, msg: 'params err name' });
  if (!investigator) res.send({ success: false, msg: 'params err investigator'});

  let investigatorId = investigator._id
  let cardArray = []

  cards.forEach((i, index) => {
    if (index === 0) return
    cardArray.push({
      card_id: i.card._id,
      qty: i.qty,
      require: i.require
    });
  });

  const addedDeck = new Deck({
    name: name,
    author_id: author,
    investigator_id: investigatorId,
    cards: cardArray
  });

  addedDeck.save()
  .then((r) => {
    res.send({ success: true, id: r.id });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message});
  });
};
