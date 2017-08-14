'use strict';

module.exports = app => {
  class ShortService extends app.Service {
    * get(query) {
      const table = app.config.shorturl.table;
      const result = yield app.mysql.get(table, query);
      return result;
    }

    * set(condition) {
      const table = app.config.shorturl.table;
      const result = yield app.mysql.insert(table, condition);
      return result;
    }

    * del(condition) {
      const table = app.config.shorturl.table;
      const result = yield app.mysql.delete(table, condition);
      return result;
    }

    * select(condition) {
      const table = app.config.shorturl.table;
      const result = yield app.mysql.select(table, condition);
      return result;
    }

    * update(condition) {
      const table = app.config.shorturl.table;
      const result = yield app.mysql.update(table, condition);
      return result;
    }

    /**
     * 缩短链接
     * @param {String} url url地址
     * @return {Object} result 由原始url与hash组成的结果
     */
    * shorten(url) {
      const exist = yield this.get({ url });

      if (!exist) {
        const insert = yield this.set({ url });
        const id = insert.insertId;
        const hash = this.ctx.helper.getHashId(id);

        const existHash = yield this.get({ hash });
        if (existHash) {
          yield this.del({ id });
          const err = new Error('Invalid Hash');
          err.status = 400;
          throw err;
        }

        yield this.update({
          id,
          url,
          hash,
        });

        return {
          url,
          hash,
        };
      }

      const { hash } = exist;

      return {
        url,
        hash,
      };
    }

    /**
     * 展开链接
     * @param {String} hash 短链接hash
     * @param {Bealoon} record 是否记录本次访问
     * @return {Object} result 数据库中该地址的详细信息
     */
    * expand(hash) {
      const { cache_prefix, cache_maxAge } = app.config.shorturl;

      let result = yield app.redis.get(`${cache_prefix}:${hash}`);

      if (!result) {
        result = yield this.get({ hash });

        if (result) {
          yield app.redis.set(
            `${cache_prefix}:${hash}`,
            JSON.stringify(result),
            'ex',
            cache_maxAge
          );
        }
      }

      // 如果result是字符串，需要转换成json
      result = typeof result === 'string' ? JSON.parse(result) : result;

      return result;
    }

    * count(offset = 0, limit = 10) {
      const _limit = parseInt(limit) || 10;
      const result = yield this.select({
        orders: [[ 'created', 'desc' ], [ 'id', 'desc' ]],
        limit: _limit > 100 ? 100 : _limit,
        offset: parseInt(offset),
      });

      return result;
    }
  }
  return ShortService;
};
