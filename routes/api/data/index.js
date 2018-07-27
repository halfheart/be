const router = require('express').Router();
const pack = require('./pack');
const card = require('./card');

router.use('/pack', pack);
router.use('/card', card);

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `unknown uri ${req.path}` });
});
module.exports = router;
