'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1500557355061_4733';

  // add your config here

  config.mysql = {
    client: {
      host: '192.168.2.121',
      port: '3306',
      user: 'root',
      password: 'mysql',
      database: 'shorturl',
    },
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: null,
      db: 0,
    },
  };

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
