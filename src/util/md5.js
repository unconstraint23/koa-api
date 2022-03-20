const crypto = require('crypto')

module.exports = str => {
  return crypto.createHash('md5')
    .update('person' + str)
    .digest('hex')
}