const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const { User } = require('../../models/user');
const auth = require('../auth');

router.post('/users', function (req, res, next) {
  console.log('post /users');
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
