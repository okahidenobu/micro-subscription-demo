FROM node:10.17.0-alpine

RUN apk update && \
    yarn install

COPY ./src/ /micro-test/

WORKDIR /micro-test
