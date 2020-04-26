import {Context} from '../../'

export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phone: string;
}

function getUser(parent:{ id : number} , args: User, ctx: Context): [User] {
    const  id = Number(args.id)
    const {prisma}: any = ctx

    if(!id)
        return prisma.users.findMany()

    
    return prisma.users.findOne({
        where:{
            id: Number(id),
        }
    })

}



export default {
    Query: {
        getUser
    }
}