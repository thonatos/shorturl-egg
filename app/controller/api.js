'use strict';

module.exports = app => {
  class ApiController extends app.Controller {
    *shorten() {
      const body = this.ctx.request.body;
      this.app.validator.validate(
        {
          url: {
            type: 'url',
            require: true,
          },
        },
        body
      );

      // url
      const { url } = body;

      // store
      const result = yield this.service.shorten.shorten(url);

      // return
      this.ctx.body = result;
    }

    *expand() {
      const hash = this.ctx.params.hash;
      const result = yield this.service.shorten.expand(hash);

      // return
      this.ctx.body = result;
    }

    *count() {
      const { offset = 0, limit = 10 } = this.ctx.query;
      const result = yield this.service.shorten.count(offset, limit);
      this.ctx.body = result;
    }
  }
  return ApiController;
};
