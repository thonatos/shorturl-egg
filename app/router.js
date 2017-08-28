'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/:hash', 'home.redirect');
  app.get('/qr/:hash', 'home.qrcode');

  app.get('/api/v1/count', 'api.count');
  app.get('/api/v1/expand/:hash', 'api.expand');
  app.post('/api/v1/update', 'api.update');
  app.post('/api/v1/shorten', 'api.shorten');
};
