const User = require('../../../../models/users');

exports.signin = (req, res) => {
  const {
    email,
    pwd
  } = req.body;

  User.findOne({email})
  .then((r) => {
    if (!r) throw new Error('존재하지 않는 이메일');
    return User.findOne({
      email,
      pwd
    });
  })
  .then((r) => {
    if (!r) throw new Error('비밀번호가 다릅니다');
    res.send({ success: true });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}

exports.register = (req, res) => {
  const {
    email,
    username,
    pwd
  } = req.body;

  if (email === undefined) res.send({ success: false, msg: 'params err email' });
  if (username === undefined) res.send({ success: false, msg: 'params err username' });
  if (pwd === undefined) res.send({ success: false, msg: 'params err pwd' });

  const u = new User({
    email,
    username,
    pwd
  });

  u.save()
  .then(() => {
    res.send({ success: true });
  })
  .catch((err) => {
    res.send({ success: false, msg: err.message });
  });
}

exports.validate = (req, res) => {
  let { query } = req.query;

  if (query === undefined) res.send({ success: false, msg: 'params err query' });

  query = JSON.parse(query);

  User.findOne(query)
  .then((r) => {
    if (r) throw new Error('중복')
    res.send({ success: true, valid: true });
  })
  .catch((err) => {
    res.send({ success: true, msg: err.message , valid: false });
  })
}
