const router = require('express').Router();
const ctrl = require('./ctrls');

router.post('/signin', ctrl.signin);
router.post('/signout', ctrl.signout);
router.post('/register', ctrl.register);
router.get('/validate', ctrl.validate);

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `unknown uri ${req.path}`});
});

module.exports = router;
