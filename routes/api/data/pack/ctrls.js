const Pack = require('../../../../models/packs');

exports.pack = (req, res) => {
  const { _id } = req.query;
  console.log(_id);

  Pack.findOne({ _id: _id })
  .then((r) => {
    res.send({ success: true, pack: r });
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
    search
  } = req.query

  if (draw === undefined) res.send({ success: false, msg: 'params err draw' });
  if (skip === undefined) res.send({ success: false, msg: 'params err skip' });
  if (limit === undefined) res.send({ success: false, msg: 'params err limit' });
  if (sort === undefined) res.send({ success: false, msg: 'params err sort' });
  if (order === undefined) res.send({ success: false, msg: 'params err order' });
  if (search === undefined) res.send({ success: false, msg: 'params err search' });

  skip = parseInt(skip);
  limit = parseInt(limit);
  sort = parseInt(sort);

  let packs = {
    cnt: 0,
    draw: draw,
    array: []
  };

  let f = {};

  Pack.count(f)
    .where('name').regex(search)
    .then((c) => {
      packs.cnt = c;
      let s = {};
      s[order] = sort;
      return Pack.find(f)
      .where('name').regex(search)
      .sort(s)
      .skip(skip)
      .limit(limit);
    })
    .then((r) => {
      packs.array = r;
      res.send({ success: true, packs: packs});
    })
    .catch((err) => {
      res.send({ success: false, msg: err.message });
    });
};

exports.filter = (req, res) => {
  const {
    exclude,
    parent
  } = req.query;

  let packs = {
    array: []
  };

  let query = Pack.find();

  if (exclude !== undefined) query = query.where('name').ne(exclude);
  if (parent === 'null') query = query.where('parent').equals(null);

  query.then((r) => {
    packs.array = r;
    res.send({ success: true, packs: packs });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
};

exports.add = (req, res) => {
  const {
    name,
    parent
  } = req.body

  if (!name) res.send({ success: false, msg: 'params err name' });

  const addedPack = new Pack({
    name,
    parent
  });

  addedPack.save()
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

  const o = { _id: set._id };
  const modedPack = { $set: set };

  Pack.findOne({ parent: set._id })
  .then((r) => {
    if (r && set.parent !== null) throw new Error('자식 팩이 있는경우 부모를 가질 수 없습니다');
    return Pack.findOneAndUpdate(o, modedPack)
  })
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

  Pack.findOne({ _id: _id })
  .then((r) => {
    if (!r) throw new Error('Pack not exists');
    return Pack.remove({ _id: _id });
  })
  .then(() => {
    return Pack.update({ parent: _id }, { parent: null }, { multi: true });
  })
  .then(() => {
    res.send({ success: true });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
};
