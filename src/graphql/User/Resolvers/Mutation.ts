import {Context} from '../../..'

import {User} from '../User'


 function signup(parent : { id : number}, args: {data: User}, ctx: Context): Promise<Object> {

  const {data}: {data: User} = args

  const {prisma} = ctx;

 return prisma.users.create({
      data
    })

}


export const Mutation = {
    signup
}