'use strict'

const { diff, patch } = require('jsondiffpatch')
const jwt = require('jsonwebtoken')

module.exports = function MessageParser(options) {

  this.decode = function (message) {
    return new Promise((resolve, reject) => {
      jwt.verify(message, options.secret, (err, data) => {
        if (err) return reject(err);
        resolve(data)
      })
    })
  }

  this.encode = function (message) {
    return jwt.sign(message, options.secret, {
      expiresIn: '30s'
    })
  }
}
