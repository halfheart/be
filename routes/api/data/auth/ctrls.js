const User = require('../../../../models/users');
const gb = require('../../../../system/global');
const jwt = require('jsonwebtoken');
const cfg = require('../../../../cfg/cfg');

exports.signin = (req, res) => {
  const {
    email,
    pwd
  } = req.body;

  let user = {};

  User.findOne({email})
  .then((r) => {
    if (!r) throw new Error('존재하지 않는 이메일');
    if (r.pwd !== gb.f.encrypt(pwd)) throw new Error('비밀번호가 다릅니다');

    const secret = req.app.get('jwt-secret');
    user = {
      _id: r._id,
      email: r.email,
      username: r.username
    };
    const p = new Promise((resolve, reject) => {
      jwt.sign(
        user,
        secret,
        {
          expiresIn: cfg.web.jwt.expiresIn,
          issuer: cfg.web.host,
          subject: 'user-token'
        },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        })
    })
    return p;
  })
  .then((tk) => {
    res.set('WWW-Authenticate', tk);
    res.send({ success: true, d: user });
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
    email: email,
    username: username,
    pwd: gb.f.encrypt(pwd)
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
