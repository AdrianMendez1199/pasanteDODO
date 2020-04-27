import path from 'path'
import {mergeResolvers, mergeTypes, fileLoader} from 'merge-graphql-schemas'

const typesArray: string[] =  fileLoader(path.join(__dirname, '/**/*.graphql'))
const resolversArray: any[] = fileLoader(path.join(__dirname, '/**/Resolvers/*.ts'))

export const types: string = mergeTypes(typesArray)
export const resolvers: any = mergeResolvers(resolversArray)


