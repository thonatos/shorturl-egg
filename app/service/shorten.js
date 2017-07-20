'use strict'

const TABLE_NAME = 'url'
const MAX_AGE = 3600 * 24 * 7

module.exports = app => {
  class ShortService extends app.Service {
    *get(query) {
      const result = yield app.mysql.get(TABLE_NAME, query)
      return result
    }

    *set(condition) {
      const result = yield app.mysql.insert(TABLE_NAME, condition)
      return result
    }

    *update(condition) {
      const result = yield app.mysql.update(TABLE_NAME, condition)
      return result
    }

    *shorten(url) {
      let result = yield this.get({ url })
      if (!result) {
        result = yield this.set({ url })
      }

      // hash
      const hash = this.ctx.helper.bs58Encode(result.id)
      return hash
    }

    *record(result) {
      const view = result.view + 1
      const updated = Object.assign({}, result, { view })
      yield this.update(updated)
      return updated
    }

    *expand(hash, record = true) {
      let result = yield app.redis.get(hash)
      if (!result) {
        const id = this.ctx.helper.bs58Decode(hash)
        result = yield this.get({ id })
        yield app.redis.set(hash, JSON.stringify(result), 'ex', MAX_AGE)
      }

      if (record && result) {
        result = typeof result === 'string' ? JSON.parse(result) : result
        result = yield this.record(result)
      }

      return result
    }
  }
  return ShortService
}
