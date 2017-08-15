'use strict';

const util = require('util');
const QRCode = require('qrcode');
const toDataURL = util.promisify(QRCode.toDataURL);

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      yield this.ctx.render('rct/build/index.html');
    }

    * redirect() {
      const { ctx, service } = this;
      const hash = ctx.params.hash;
      const record = yield service.shorten.expand(hash);
      if (!record) {
        const err = new Error('no record found');
        err.status = 404;
        throw err;
      }

      const ip = ctx.ip;
      const ua = ctx.get('User-Agent');
      const date = new Date();

      yield service.report.post({
        hash,
        ip,
        ua,
        date,
        record,
      });

      this.ctx.status = 302;
      this.ctx.redirect(record.url);
    }

    * qrcode() {
      const { ctx, service } = this;
      const hash = ctx.params.hash;
      const record = yield service.qrcode.query(hash);
      const { text } = record;
      const dataUrl = yield toDataURL(text, { version: 2, errorCorrectionLevel: 'H', margin: 2 });
      yield ctx.render('home/qrcode.html', {
        hash,
        dataUrl,
      });
    }
  }
  return HomeController;
};
