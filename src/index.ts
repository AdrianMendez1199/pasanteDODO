import { ApolloServer } from 'apollo-server'
import { typeDefs, resolvers } from './graphql'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import { Request } from './graphql/User/User'

const prisma = new PrismaClient();

dotenv.config()

export interface Context {
  prisma: typeof prisma;
  request?: typeof Request;
}

interface OptionServer {
  port: number;
  endpoint: string;
  playground: string;
  debug: boolean;
}


const options: OptionServer = {
  port: Number(process.env.GRAPHQL_SERVER_PORT) || 3005,
  endpoint: process.env.GRAPHQL_END_POINT || '/graphql',
  playground: process.env.GRAPHQL_PLAYGROUND || '/playground',
  debug: true
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request): object => ({ request, prisma })
});

server.listen({ ...options }).then();
