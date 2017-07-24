'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1500557355061_4733';

  config.security = {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };

  config.shorturl = {
    cache_maxAge: 3600 * 24 * 7,
    cache_prefix: 'swz',
    table: 'url',
  };

  return config;
};
