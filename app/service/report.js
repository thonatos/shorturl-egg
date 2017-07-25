'use strict';

module.exports = app => {

  class ReportService extends app.Service {
    /**
     * 将访问记录发送给elasticsearch进行记录
     * @param {Object} record 记录内容
     * @return {Object} error 是否异常
     */
    * post(record) {
      try {
        yield this.app.elasticsearch.create({
          index: 'shorturl',
          type: 'view',
          id: new Date().getTime(),
          body: record,
          pipeline: 'geoip',
        });
        return false;
      } catch (error) {
        return error;
      }

    }
  }

  return ReportService;
};
