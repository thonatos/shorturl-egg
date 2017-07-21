'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/:hash', 'home.redirect');

  app.get('/api/count', 'api.count');
  app.get('/api/expand/:hash', 'api.expand');
  app.post('/api/shorten', 'api.shorten');
};
