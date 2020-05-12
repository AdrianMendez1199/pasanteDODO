import { Context } from '../../..'
import { Company } from '../Company'
import { createUserAndRole, User } from '../../User/User'


export const Mutation = {
  /**
  * this function create Job
  * @param parent 
  * @param args 
  * @param ctx 
  */
  async createCompany(_: void, args: { data: Company; dataUser: User }, ctx: Context): Promise<object> {
    const { data, dataUser } = args
    const { prisma } = ctx

    await createUserAndRole(dataUser, ctx)

    return prisma.company.create({ data })
  }

}