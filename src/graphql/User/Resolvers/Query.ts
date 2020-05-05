import {Context} from '../../..'
import {User as UserInterface, Profile} from '../User'

/**
 * this function return users
 * if pass id return specific user
 * @param parent 
 * @param args 
 * @param ctx 
 */
function getUser(parent: { id: number}, args: UserInterface, ctx: Context): object {
    const {orderBy, id}: UserInterface = args

    const {prisma}: Context = ctx

    if(!id)
        return prisma.users.findMany({
            orderBy
        })

    
    return prisma.users.findMany({
        where:{
            id: Number(id)
        }
        
    })

}

/**
 * this function return user by email
 * @param parent 
 * @param args 
 * @param ctx 
 */
function getUserByEmail(parent: { id: number}, args: UserInterface, ctx: Context): object {
    const { email }: UserInterface =  args
    const {prisma}: Context = ctx

    // isAuthenticate(request)

    return prisma.users.findOne({
        where: {
            email
        }
    })
}

/**
 * return user profile
 * @param parent 
 * @param args 
 * @param ctx 
 */
function userProfile(parent: { id: number}, args: Profile, ctx: Context): object {
    const {id} = parent
    const {prisma} = ctx

    return prisma.users.findOne({
        where:{
            id: Number(id)
        }
    }).profile()
}

export const Query = {
    getUser,
    getUserByEmail
}

export const User = {
    userProfile
}
