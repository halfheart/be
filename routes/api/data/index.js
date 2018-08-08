const router = require('express').Router();
const pack = require('./pack');
const card = require('./card');
const deck = require('./deck');

router.use('/pack', pack);
router.use('/card', card);
router.use('/deck', deck);

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `unknown uri ${req.path}` });
});
module.exports = router;
