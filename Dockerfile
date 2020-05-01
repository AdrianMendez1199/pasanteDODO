FROM node:13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

#USER node

RUN rm -rf node_modules
RUN rm -rf dist 

RUN apk add build-base 
RUN yarn add node-gyp -g  

COPY . .

 RUN yarn build

#COPY --chown=node:node . .


CMD ["yarn", "dev"]
