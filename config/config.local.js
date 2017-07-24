'use strict';

// add your config here

exports.site = {
  domain: 'http://localhost:7001/',
};

exports.mysql = {
  client: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'mysql',
    database: 'shorturl',
  },
};

exports.redis = {
  client: {
    port: 6379,
    host: '127.0.0.1',
    password: null,
    db: 0,
  },
};

exports.elasticsearch = {
  host: 'localhost:9200',
};
