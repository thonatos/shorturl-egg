'use strict';

module.exports = app => {
  class ApiController extends app.Controller {
    * shorten() {
      const body = this.ctx.request.body;
      const errors = this.app.validator.validate(
        {
          url: 'url',
        },
        body
      );

      if (errors) {
        const err = new Error(JSON.stringify(errors));
        err.status = 400;
        throw err;
      }

      // url
      const { url } = body;

      // store
      const result = yield this.service.shorten.shorten(url);
      result.shorturl = app.config.site.domain + result.hash;

      // return
      this.ctx.body = result;
    }

    * expand() {
      const hash = this.ctx.params.hash;
      const result = yield this.service.shorten.expand(hash);

      // return
      this.ctx.body = result;
    }

    * count() {
      const { offset = 0, limit = 10 } = this.ctx.query;
      const result = yield this.service.shorten.count(offset, limit);
      this.ctx.body = result;
    }

    * update() {
      const token = this.ctx.get('Authorization-Token') || null;
      const { token: authToken } = app.config.auth;

      if (authToken !== token) {
        const err = new Error('no access');
        err.status = 403;
        throw err;
      }

      const body = this.ctx.request.body;
      const errors = this.app.validator.validate(
        {
          url: 'url',
          hash: 'string',
        },
        body
      );

      if (errors) {
        const err = new Error(JSON.stringify(errors));
        err.status = 400;
        throw err;
      }

      const res = yield this.service.shorten.update(body);

      this.ctx.body = res;
    }
  }
  return ApiController;
};
