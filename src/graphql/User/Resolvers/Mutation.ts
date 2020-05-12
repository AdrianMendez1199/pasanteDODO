import { Context } from '../../..'
import bcrypt from 'bcrypt'
import { User, Login, genereteToken, Profile, createUserAndRole } from '../User'


/**
 * this function create user
 * @param args 
 * @param ctx 
 * @returns Promise<User>
 */
async function signup(_: void, args: { data: User }, ctx: Context): Promise<User> {
  const { data }: { data: User } = args
  return await createUserAndRole(data, ctx)
}

/**
 * this function update user
 * @param args 
 * @param ctx 
 */
function updateUser(_: void, args: { data: User; id: number }, ctx: Context): object {
  const { data, id }: { data: User; id: number } = args
  const { prisma } = ctx

  return prisma.users.update({ where: { id: Number(id) }, data })

}

/**
 * function login
 * @param args 
 * @param ctx 
 * @returns Promise<Login>
 */
async function login(_: void, args: Login, ctx: Context): Promise<Login> {

  const { data } = args
  const { prisma } = ctx

  const user: User | null = await prisma.users.findOne({ where: { email: data.email } })

  if (!user) {
    throw new Error('incorrect crendentials')
  }

  const validPassword = await bcrypt.compare(data.password, user.password)

  const role: any = await prisma.user_role
    .findMany({ where: { user_id: Number(user.id) } })


  if (!validPassword) {
    throw new Error('incorrect crendentials')
  }


  return {
    token: genereteToken(user, role[0].role_id),
    data: user
  }

}

async function uploadProfile(_: void, args: Profile, ctx: Context): Promise<object> {
  const { data } = args
  const { prisma } = ctx


  const createManyProfile = data.map((profile: Profile) =>
    prisma.profile.create({
      data: {
        institution: profile.institution,
        position: profile.position,
        startDate: new Date(profile.startDate),
        users: {
          connect: { id: Number(profile.userId) }
        }
      }
    }),

  );

  const profile: Array<object> = await Promise.all(createManyProfile)
  return profile

}

export const Mutation = {
  signup,
  updateUser,
  login,
  uploadProfile
}