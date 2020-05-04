import {Context} from '../../..'
import {User} from '../User'


function getUser(parent: { id: number}, args: User, ctx: Context): object {
    const {orderBy, id}: User = args

    const {prisma}: Context = ctx

    if(!id)
        return prisma.users.findMany({
            orderBy
        })

    
    return prisma.users.findMany({
        where:{
            id
        }
        
    })

}


function getUserByEmail(parent: { id: number}, args: User, ctx: Context): object {
    const { email }: User =  args
    const {prisma}: Context = ctx

    // isAuthenticate(request)

    return prisma.users.findOne({
        where: {
            email
        }
    })
}

export const Query = {
    getUser,
    getUserByEmail
}
