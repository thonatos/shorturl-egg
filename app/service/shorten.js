'use strict';

module.exports = app => {
  class ShortService extends app.Service {
    /**
     * 缩短链接
     * @param {String} url url地址
     * @return {Object} result 由原始url与hash组成的结果
     */
    * shorten(url) {
      const { table } = app.config.shorturl;
      const exist = yield app.mysql.get(table, { url });
      if (!exist) {
        const insert = yield app.mysql.insert(table, { url });
        const id = insert.insertId;
        const hash = this.ctx.helper.getHashId(id);
        // 检查是否已经存在hash，如果存在则删除本条记录以使得 id 自增
        const existHash = yield app.mysql.get(table, { hash });
        if (existHash) {
          yield app.mysql.delete(table, { id });
          const err = new Error('Invalid Hash');
          err.status = 400;
          throw err;
        }
        // 更新 hash
        yield app.mysql.update(table, {
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
      const { cache_prefix, cache_maxAge, table } = app.config.shorturl;
      let result = yield app.redis.get(`${cache_prefix}:${hash}`);
      if (!result) {
        result = yield app.mysql.get(table, { hash });
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
      const { table } = app.config.shorturl;
      const _limit = parseInt(limit) || 10;
      const result = yield app.mysql.select(table, {
        orders: [['created', 'desc'], ['id', 'desc']],
        limit: _limit > 100 ? 100 : _limit,
        offset: parseInt(offset),
      });
      return result;
    }

    * update({ hash, url }) {
      const { table, cache_prefix } = app.config.shorturl;
      const exist = yield app.mysql.get(table, { hash });
      if (!exist) {
        const error = new Error('hash not exist');
        error.status = 400;
        throw error;
      }
      const { id } = exist;
      yield app.mysql.update(table, {
        id,
        url,
      });

      yield app.redis.del(`${cache_prefix}:${hash}`);

      return {
        hash,
        url,
      };
    }
  }
  return ShortService;
};
