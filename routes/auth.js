const jwt = require('express-jwt');
const secret = require('../config').secret;

function getTokenFromHeader (req) {
  const authorization = req.headers.authorization;

  if (authorization && authorization.split(' ')[0] === 'Token' ||
    authorization && authorization.split(' ')[0] === 'Bearer') {
      return authorization.split(' ')[1];
    }
}

const auth = {
  required: jwt({
    secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;
