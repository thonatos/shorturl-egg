'use strict';

// add your config here

exports.site = {
  domain: 'http://localhost:7001/',
};

exports.mysql = {
  client: {
    host: 'mysql',
    port: '3306',
    user: 'root',
    password: 'mysql',
    database: 'shorturl',
  },
};

exports.redis = {
  client: {
    port: 6379,
    host: 'redis',
    password: null,
    db: 0,
  },
};

exports.elasticsearch = {
  host: 'elasticsearch:9200',
};
