# shorturl

egg-shorturl

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Database

```mysql
create table shorturl.url
(
	id bigint auto_increment
		primary key,
	url varchar(256) not null,
	created datetime default CURRENT_TIMESTAMP null,
	constraint url_id_uindex
		unique (id),
	constraint url_url_uindex
		unique (url)
)
;
```

### Development
```shell
$ npm install
$ npm run dev
$ open http://localhost:7001/news
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


[egg]: https://eggjs.org