import {Context} from '../../..'
import bcrypt from 'bcrypt'
import {User, Login, genereteToken} from '../User'


export interface Profile {
    data: Array<Profile>
    id:          number;
    description?: string;
    endDate?:      Date;
    institution: string;
    position:    string;
    startDate:   Date;
    userId:      number;
}


/**
 * this function create user
 * @param parent 
 * @param args 
 * @param ctx 
 * @returns Promise<User>
 */
async function signup(parent: { id: number}, args: {data: User}, ctx: Context): Promise<User> {
    const {data}: {data: User} = args
    const {prisma} = ctx
 
    const salt = await bcrypt.genSalt(10)
    data.password = await bcrypt.hash(data.password, salt)
  
    const userCreated: User = await prisma.users.create({
        data
    })

    await prisma.user_role.create({
        data: {
            role:{connect: {id: 2}},
            users:{connect: {id: userCreated.id}}
        }
    })

    return userCreated
}

/**
 * this function update user
 * @param parent 
 * @param args 
 * @param ctx 
 */
function updateUser (parent: { id: number}, args: {data: User; id: number}, ctx: Context): Promise<User> {
    const {data, id}: {data: User; id: number} = args
    const {prisma} = ctx

    const updatedUser = prisma.users.update({
        where:{
            id: Number(id)
        },
        data
    })


    return updatedUser

}

/**
 * function login
 * @param parent 
 * @param args 
 * @param ctx 
 * @returns Promise<Login>
 */
async function login(parent: { id: number}, args: Login, ctx: Context): Promise<Login> {

    const {data} = args
    const {prisma} = ctx

    const users: User | null = await prisma.users.findOne({
        where: {
            email: data.email 
        }
    })

    if(!users)
        throw new Error('incorrect crendentials')

    const isAuth = await bcrypt.compare(data.password, users.password)

    if(!isAuth)
        throw new Error('incorrect crendentials')

    const token: string = genereteToken(users)

    return {
        token, data:users
    }

}

async function uploadProfile (parent: { id: number}, args: Profile, ctx: Context): Promise<object> {
    const {data} = args
    const {prisma} = ctx


    const createManyProfile = data.map((profile: Profile) =>
        prisma.profile.create({
            data: {
                institution: profile.institution,
                position:    profile.position,
                startDate:   new Date(profile.startDate),
                users:{
                    connect: {id: Number(profile.userId)}
                }
            }
        }),

    );
 
    const profile : Array<object> = await Promise.all(createManyProfile)
    return profile

}

export const Mutation = {
    signup,
    updateUser,
    login,
    uploadProfile
}