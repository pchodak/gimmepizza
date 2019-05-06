FROM node:8.9.4

RUN mkdir -p /api

WORKDIR /api

COPY package.json /api

RUN rm -rf node_modules && npm install

COPY . /api

EXPOSE 3000
