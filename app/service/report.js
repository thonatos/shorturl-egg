'use strict';

const elasticsearch = require('elasticsearch');

module.exports = app => {

  class ReportService extends app.Service {

    constructor() {
      super();
      this.es = new elasticsearch.Client({
        host: app.config.elasticsearch.host,
      });
    }

    /**
     * 将访问记录发送给elasticsearch进行记录
     * @param {Object} record 记录内容
     */
    * post(record) {
      yield this.es.create({
        index: 'shorturl',
        type: 'view',
        id: new Date().getTime(),
        body: record,
        pipeline: 'geoip',
      });
    }
  }

  return ReportService;
};
