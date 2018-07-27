const router = require('express').Router();
const ctrl = require('./ctrls');

router.get('/list', ctrl.list);
router.get('/filter', ctrl.filter);
router.get('/', ctrl.pack);
router.post('/', ctrl.add);
router.put('/', ctrl.mod);
router.delete('/', ctrl.del);

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `unknown uri ${req.path}`});
});

module.exports = router;
