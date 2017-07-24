'use strict';

// had enabled by egg
// exports.static = true;

// view/nunjucks
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

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
