'use strict';

const bs58 = require('bs58');
const AUTO_INCREMENT_INDEX = 9999999; // base58 起点从999999开始

module.exports = {
  getHashId(id) {
    const bytes = Buffer.from(id + AUTO_INCREMENT_INDEX + '', 'hex');
    return bs58.encode(bytes);
  },
  getIntId(hash) {
    const bytes = bs58.decode(hash);
    const idString = bytes.toString('hex');
    return parseInt(idString) - AUTO_INCREMENT_INDEX;
  },
};
