const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const auth = require('../auth');

router.get('/user', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if (!user) {
      return res.sendStats(401);
    }

    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});

router.post('/users', (req, res, next) => {
  const user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  user.save()
    .then(() => res.json({ user: user.toAuthJSON() }))
    .catch(next);
});

module.exports = router;
