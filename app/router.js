'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/:hash', 'home.redirect');

  app.get('/api/count', 'api.count');
  app.get('/api/v1/expand/:hash', 'api.expand');
  app.post('/api/v1/shorten', 'api.shorten');
};
