FROM node:12

WORKDIR /root/src

COPY . ./

RUN yarn install && yarn test
