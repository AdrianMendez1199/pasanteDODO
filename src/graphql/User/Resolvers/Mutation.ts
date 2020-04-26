import {Context} from '../../..'
import bcrypt from 'bcrypt'
import {User} from '../User'


/**
 * this function create user
 * @param parent 
 * @param args 
 * @param ctx 
 * @returns Promise<User>
 */
 async function signup(parent : { id : number}, args: {data: User}, ctx: Context): Promise<User> {
    const {data}: {data: User} = args
    const {prisma} = ctx;
 
    const salt = await bcrypt.genSalt(10)
    data.password = await bcrypt.hash(data.password, salt)
  
    const userCreated = await prisma.users.create({
        data
    })

    return userCreated
}


export const Mutation = {
    signup
}