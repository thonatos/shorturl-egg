'use strict';

module.exports = app => {

  class QrcodeService extends app.Service {
    * query(hash) {
      const record = yield app.mysql.get('qrcode', { hash });
      if (!record) {
        const err = new Error('Not exist.');
        err.status = 404;
        throw err;
      }
      return record;
    }
  }

  return QrcodeService;
};
