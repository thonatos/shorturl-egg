'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    *index() {
      this.ctx.body = 'hi, egg';
    }

    *redirect() {
      const hash = this.ctx.params.hash;
      const result = yield this.service.shorten.expand(hash);
      if (!result) {
        const err = new Error('no record found');
        err.status = 404;
        throw err;
      }

      this.ctx.status = 302;
      this.ctx.redirect(result.url);
    }
  }
  return HomeController;
};
