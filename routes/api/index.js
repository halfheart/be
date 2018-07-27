const router = require('express').Router();
const data = require('./data');

router.all('*', (req, res, next) => {
  //미들웨어
  next();
});

router.use('/data', data);

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `unknown uri ${req.path}`});
});

module.exports = router;
