const jwt = require('express-jwt');
const secret = 'secret';

function getTokenFromHeader(req) {
  const authorization = req.headers.authorization;
  const authType = authorization && authorization.split(' ')[0];
  const token = authorization && authorization.split(' ')[1];

  if ((authType === 'Token' || authType === 'Bearer') && token) {
    return token;
  }

  return null;
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
