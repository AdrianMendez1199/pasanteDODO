import {Context} from '../../..'
import bcrypt from 'bcrypt'
import {User, Role} from '../User'


/**
 * this function create user
 * @param parent 
 * @param args 
 * @param ctx 
 * @returns Promise<User>
 */
 async function signup(parent : { id : number}, args: {data: User, role: string}, ctx: Context): Promise<User> {
    const {data}: {data: User} = args
    const {prisma} = ctx
 
    const salt = await bcrypt.genSalt(10)
    data.password = await bcrypt.hash(data.password, salt)
  
    const userCreated: User = await prisma.users.create({
        data
    })

     await prisma.user_role.create({
        data: {
          role:{connect: {id: 1}},
          users:{connect: {id: userCreated.id}}
        }
    })

    return userCreated
}


function updateUser (parent : { id : number}, args: {data: User, id: number}, ctx: Context): Promise<User> {
    const {data, id}: {data: User, id: number} = args
    const {prisma} = ctx

    const updatedUser = prisma.users.update({
        where:{
            id: Number(id)
        },
        data
    })


    return updatedUser

}


export const Mutation = {
    signup,
    updateUser
}