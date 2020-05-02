FROM node:13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

#USER node

RUN rm -rf node_modules dist 

RUN apk add build-base \
     python3

# RUN yarn add node-gyp -g  

COPY . .

RUN yarn install 
RUN yarn build 

RUN chmod +x ./scripts/schema.sh
RUN sh ./scripts/schema.sh

# RUN npx prisma generate
#COPY --chown=node:node . .

CMD ["node", "./dist/src/index.js"]
