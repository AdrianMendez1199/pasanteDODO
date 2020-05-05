import {Context} from '../../..'
import { Company } from '../Company'

/**
  * this function create Job
  * @param parent 
  * @param args 
  * @param ctx 
  */
function createCompany(parent: { id: number}, args: {data: Company}, ctx: Context): object {
    const {data} = args
    const {prisma} = ctx
   
    return prisma.company.create({
        data
    })
}

export const Mutation = {
    createCompany
}