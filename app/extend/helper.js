'use strict';

const bs58 = require('bs58');

// base58 起点从999999开始
module.exports = {
  getHashId(id, baseIndex = 9999999) {
    const bytes = Buffer.from(id + baseIndex + '', 'hex');
    return bs58.encode(bytes);
  },
  getIntId(hash, baseIndex = 9999999) {
    const bytes = bs58.decode(hash);
    const idString = bytes.toString('hex');
    return parseInt(idString) - baseIndex;
  },
};
