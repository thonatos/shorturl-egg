'use strict';

module.exports = app => {
  class ShortService extends app.Service {
    *get(query) {
      const table = app.config.shorturl.table;
      const result = yield app.mysql.get(table, query);
      return result;
    }

    *set(condition) {
      const table = app.config.shorturl.table;
      const result = yield app.mysql.insert(table, condition);
      return result;
    }

    *select(condition) {
      const table = app.config.shorturl.table;
      const result = yield app.mysql.select(table, condition);
      return result;
    }

    *update(condition) {
      const table = app.config.shorturl.table;
      const result = yield app.mysql.update(table, condition);
      return result;
    }

    /**
     * 访问记录:该方法应该实现向队列的推送功能，不应该直接记录到数据库，以防止较大访问时堵塞数据库
     * @param {Object} result 
     * @return {Object} 
     * TODO: 实现访问记录功能
     */
    *record(result) {
      return result;
    }

    /**
     * 缩短链接
     * @param {String} url 
     */
    *shorten(url) {
      let result = yield this.get({ url });

      if (!result) {
        result = yield this.set({ url });
      }

      const id = result.id || result.insertId;
      const hash = this.ctx.helper.getHashId(id);

      return {
        url,
        hash,
      };
    }

    /**
     * 展开短地址
     * @param {String} hash 
     * @param {Bealoon} record 
     */
    *expand(hash, record = false) {
      const { cache_prefix, cache_maxAge } = app.config.shorturl;

      let result = yield app.redis.get(`${cache_prefix}:${hash}`);

      if (!result) {
        const id = this.ctx.helper.getIntId(hash) || 0;
        result = yield this.get({ id });
        yield app.redis.set(
          `${cache_prefix}:${hash}`,
          JSON.stringify(result),
          'ex',
          cache_maxAge
        );
      }

      // 如果result是字符串，需要转换成json
      result = typeof result === 'string' ? JSON.parse(result) : result;

      if (result && record) {
        yield this.record(result);
      }

      return result;
    }

    *count(offset = 0, limit = 10) {
      const _limit = parseInt(limit) || 10;
      const result = yield this.select({
        orders: [['created', 'desc'], ['id', 'desc']],
        limit: _limit > 100 ? 100 : _limit,
        offset: parseInt(offset),
      });

      return result;
    }
  }
  return ShortService;
};
