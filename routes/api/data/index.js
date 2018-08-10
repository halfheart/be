const router = require('express').Router();
const pack = require('./pack');
const card = require('./card');
const deck = require('./deck');
const auth = require('./auth');

router.use('/pack', pack);
router.use('/card', card);
router.use('/deck', deck);
router.use('/auth', auth);

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `unknown uri ${req.path}` });
});
module.exports = router;
