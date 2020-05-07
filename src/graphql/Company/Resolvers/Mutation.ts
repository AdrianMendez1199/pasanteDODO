import {Context} from '../../..'
import { Company } from '../Company'
import { createUserAndRole, User } from '../../User/User'

/**
  * this function create Job
  * @param parent 
  * @param args 
  * @param ctx 
  */
async function createCompany(parent: { id: number}, args: {data: Company; dataUser: User}, ctx: Context): Promise<object> {
    const {data, dataUser} = args
    const {prisma} = ctx

    await createUserAndRole(dataUser, ctx)

    return prisma.company.create({
        data
    })
}

export const Mutation = {
    createCompany
}