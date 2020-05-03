import {GraphQLServer, PubSub} from 'graphql-yoga'
import {types as typeDefs, resolvers} from './graphql'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

const prisma = new PrismaClient();
const pubSub = new PubSub();

dotenv.config()

export interface Context {
    prisma: typeof prisma;
    pubSub: typeof pubSub;
    request?: unknown;
}

interface OptionServer {
    port: number;
    endpoint: string;
    playground: string;
    debug: boolean;
}

const context: Context = {
    prisma,
    pubSub,
}

const options: OptionServer = {
    port: Number(process.env.GRAPHQL_SERVER_PORT) || 3005,
    endpoint: process.env.GRAPHQL_END_POINT || '/graphql',
    playground: process.env.GRAPHQL_PLAYGROUND || '/playground', 
    debug: true
}


const server: GraphQLServer = new GraphQLServer({
    typeDefs,
    resolvers,
    context: (request): object  => {
        return {
            ...request,
            ...context
        }
    },
    // middlewares TODO
});

server.start(options) 
