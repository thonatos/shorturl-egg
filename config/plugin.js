'use strict';

// had enabled by egg
// exports.static = true;

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.validate = {
  package: 'egg-validate',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};
