import {GraphQLServer, PubSub} from 'graphql-yoga';
import {types as typeDefs, resolvers} from './graphql'
import {PrismaClient} from '@prisma/client';
import dotenv from 'dotenv'

const prisma = new PrismaClient();
const pubSub = new PubSub();

dotenv.config()


export interface Context {
    prisma: typeof prisma;
    pubSub: typeof pubSub;
    request?:any
}

const context: Context = {
    prisma,
    pubSub,
}

const options = {
    port: process.env.GRAPHQL_SERVER_PORT,
    endpoint: process.env.GRAPHQL_END_POINT,
    playground: process.env.GRAPHQL_PLAYGROUND, 
}


const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: request => {
        return {
            ...request,
            ...context
        }
    }
});

server.start(options, ({ port, playground }): void =>
    console.log(`Server runing http://localhost:${port}${playground}`)
)