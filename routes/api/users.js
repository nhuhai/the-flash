const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const { User } = require('../../models/user');
const auth = require('../auth');

router.get('/user', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user) {
    if (!user) {
      return res.sendStatus(401);
    }

    return res.json({
      user: user.toAuthJSON()
    });
  })
  .catch(next);
});

router.post('/users/login', function(req, res, next) {
  if(!req.body.user.email) {
    return res.status(422).json({ errors: { email: 'can\'t be blank' }});
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: 'can\'t be blank' }});
  }

  passport.authenticate('local', { session: false }, function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/users', function (req, res, next) {
  const user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  user.save().then(function () {
    return res.json({
      user: user.toAuthJSON()
    });
  }).catch(next);
});

module.exports = router;
