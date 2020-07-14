FROM node:12.18.2-alpine

RUN apk add --no-cache bash

WORKDIR /usr/src/app

COPY . .

RUN npm install
