FROM node:13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

#USER node

RUN rm -rf node_modules
RUN rm -rf dist 

COPY . .
#COPY --chown=node:node . .

RUN yarn add \
 yarn build

CMD ["yarn", "dev"]
