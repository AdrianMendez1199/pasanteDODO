import {Context} from '../../..'
import {User, isAuthenticate} from '../User'

function getUser(parent : { id : number}, args: User, ctx: Context): [User] {
    const  id = Number(args.id)
    const {orderBy} = args
    const {prisma}: any = ctx

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


function getUserByEmail(parent : { id : number}, args: User, ctx: Context): [User] {
    const { email }: {email:string} =  args
    const {prisma, request}: any = ctx

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
