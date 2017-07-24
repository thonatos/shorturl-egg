'use strict';

// add your config here

exports.site = {
  domain: 'https://swz.li/',
};

exports.mysql = {
  client: {
    host: '192.168.2.121',
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
