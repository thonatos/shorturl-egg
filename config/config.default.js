'use strict'

module.exports = appInfo => {
  const config = {}

  // should change to your own
  config.keys = appInfo.name + '_1500557355061_4733'

  // add your config here

  config.mysql = {
    // database configuration
    client: {
      // host
      host: '192.168.31.61',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'mysql',
      // database
      database: 'shorturl'
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false
  }

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '192.168.31.61', // Redis host
      password: null,
      db: 0
    }
  }

  config.security = {
    csrf: {
      ignoreJSON: true // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    }
  }

  return config
}
