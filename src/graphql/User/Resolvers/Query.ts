import { Context } from '../../..'
import { User as UserInterface, Profile } from '../User'

export const Query = {
  /**
  * this function return users
  * if pass id return specific user
  * @param _ 
  * @param args 
  * @param ctx 
  */
  getUser(_: void, args: UserInterface, ctx: Context): object {
    const { orderBy, id }: UserInterface = args

    const { prisma }: Context = ctx

    if (!id) {
      return prisma.users.findMany({ orderBy })
    }

    return prisma.users.findMany({ where: { id: Number(id) } })

  },

  /**
   * this function return user by email
   * @param _ 
   * @param args 
   * @param ctx 
   */
  getUserByEmail(_: void, args: UserInterface, ctx: Context): object {
    const { email }: UserInterface = args
    const { prisma }: Context = ctx

    return prisma.users.findOne({ where: { email } })
  },

}

export const User = {
  /**
 * return user profile
 * @param _
 * @param args 
 * @param ctx 
 */
  userProfile(parent: { id: number }, args: Profile, ctx: Context): object {
    const { id } = parent
    const { prisma } = ctx

    return prisma.users.findOne({ where: { id: Number(id) } })
      .profile()
  }

}
