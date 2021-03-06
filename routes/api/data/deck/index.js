const router = require('express').Router();
const ctrl = require('./ctrls');
const comment = require('./comment');

router.get('/list', ctrl.list);
router.get('/', ctrl.deck);
router.post('/', ctrl.add);
router.put('/', ctrl.mod);
router.delete('/', ctrl.del);

router.use('/comment', comment);

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `unknown uri ${req.path}`});
});

module.exports = router;
