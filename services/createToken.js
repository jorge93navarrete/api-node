'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');

 function createToken(userId) {
  var payload = {
    sub: userId,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix()
  }
  return jwt.encode(payload, "Misupersecretaclave")
}

module.exports ={ createToken}
