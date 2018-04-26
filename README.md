# shorturl

shorturl powered by egg.js

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development
```shell
$ npm install
$ npm run dev
$ open http://localhost:7001
```

### Deploy

Use `EGG_SERVER_ENV=prod` to enable prod mode

```shell
$ EGG_SERVER_ENV=prod npm start
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

### docker-compose

```shell
cd docs/docker-compose
docker-compose up
```

see [docs/docker-compose](https://github.com/thonatos/shorturl-egg/tree/master/docs/docker-compose) for more detail.

## Config

### Database

```
// mysql
DROP TABLE IF EXISTS  `url`;
CREATE TABLE `url` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(512) NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `hash` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8mb4;
```

```
// elasticsearch

// geoip configure
PUT _ingest/pipeline/geoip
{
  "description" : "Add geoip info",
  "processors" : [
    {
      "geoip" : {
        "field" : "ip"
      }
    }
  ]
}

// mappings
PUT shorturl
{
  "mappings": {
    "view": {
      "_all": {
        "enabled": false
      },
      "properties": {
        "ip": {
          "type": "ip"
        },
        "date": {
          "type": "date"
        }
      }
    }
  }
}
```

### Application

- app/config/config.prod.js

```js
'use strict';

exports.site = {
  domain: 'https://swz.li/',
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
```

## Api

- POST /api/v1/shorten

```js
// request body
{
	"url":"http://www.baidu.com"
}

// response
{
  "url": "http://www.baidu.com",
  "hash": "QioWY",
  "shorturl": "http://localhost:7001/QioWY"
}
```

- GET /api/v1/expand/:hash

```js
{
  "id": 2,
  "url": "http://www.baidu.com",
  "created": "2017-07-24T03:42:06.000Z"
}
```

- GET /api/v1/count

```js
[
  {
    "id": 2,
    "url": "http://www.baidu.com",
    "created": "2017-07-24T03:42:06.000Z"
  },
  {
    "id": 1,
    "url": "http://www.baidu.com/?test=3",
    "created": "2017-07-23T06:56:48.000Z"
  }
]
```

[egg]: https://eggjs.org
