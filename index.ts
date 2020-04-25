import {GraphQLServer} from 'graphql-yoga';

import {types as typeDefs, resolvers} from './src/graphql'


const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
console.log('Server Runing on http://localhost:4000')
})