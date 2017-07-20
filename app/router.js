'use strict'

module.exports = app => {
  app.get('/', 'home.index')
  app.post('/api/shorten', 'api.shorten')
  app.get('/api/expand/:hash', 'api.expand')
}
