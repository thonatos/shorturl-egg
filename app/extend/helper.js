const bs58 = require('bs58')

module.exports = {
  bs58Encode(id) {
    const bytes = Buffer.from(id + '', 'hex')
    return bs58.encode(bytes)
  },
  bs58Decode(str) {
    const bytes = bs58.decode(str)
    return bytes.toString('hex')
  }
}
