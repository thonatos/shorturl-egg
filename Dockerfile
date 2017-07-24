FROM node:8.0.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm config set registry https://registry.npm.taobao.org && npm i

COPY . /usr/src/app

EXPOSE 7001

CMD [ "npm", "start" ]