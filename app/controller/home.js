'use strict';

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
  }
  return HomeController;
};
