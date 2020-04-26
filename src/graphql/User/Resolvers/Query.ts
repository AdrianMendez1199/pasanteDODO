import {Context} from '../../..'
import {User} from '../User'

function getUser(parent : { id : number}, args: User, ctx: Context): [User] {
    const  id = Number(args.id)
    const {prisma}: any = ctx

    if(!id)
        return prisma.users.findMany()

    
    return prisma.users.findMany({
        where:{
            id
        }
    })

}


function getUserByEmail(parent : { id : number}, args: User, ctx: Context): [User] {
    const { email }: {email:string} =  args
    const {prisma}: any = ctx;

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
