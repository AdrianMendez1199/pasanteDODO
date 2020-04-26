import {GraphQLServer} from 'graphql-yoga';
import {types as typeDefs, resolvers} from './graphql'
import dotenv from 'dotenv'

dotenv.config()

const options = {
  port: process.env.GRAPHQL_SERVER_PORT,
  endpoint: process.env.GRAPHQL_END_POINT,
  playground: process.env.GRAPHQL_PLAYGROUND, 
}


const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
)