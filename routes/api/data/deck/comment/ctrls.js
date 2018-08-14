const Comment = require('../../../../../models/comments')
const Deck = require('../../../../../models/decks')

exports.add = (req, res) => {
  // res.send({ success: false, msg: 'comment add 준비중' });
  const {
    target_id,
    author_id,
    content,
    parent_id
  } = req.body;

  if (target_id === undefined) res.send({ success: false, msg: 'params err target_id' });
  if (author_id === undefined) res.send({ success: false, msg: 'params err author_id' });
  if (content === undefined) res.send({ success: false, msg: 'params err content' });

  const cmt = new Comment({
    target_id,
    author_id,
    content,
    parent_id
  })

  cmt.save()
  .then((r) => {
    const f = { _id: r.target_id };
    const s = { $addToSet: { cmt_ids: r._id } };
    return Deck.updateOne(f, s);
  })
  .then((r) => {
    if (!r.nModified) throw new Error('변경 실패');
    res.send({ success: true });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  })
}

exports.mod = (req, res) => {
  res.send({ success: false, msg: 'comment mod 준비중' });
}

exports.list = (req, res) => {
  res.send({ success: false, msg: 'comment list 준비중' });
}

exports.del = (req, res) => {
  res.send({ success: false, msg: 'comment del 준비중' });
}
