import {Context} from '../../..'
import {User} from '../../User/User'

export interface Job {
    id: number;
    name: string;
    description: string;
    number_positions: number;
    publishedBy: number;
    jobAvailable: jobAvailable;
    categoryId: number;
}

enum jobAvailable {
    YES,
    NO
}

function getJob(parent: { id: number}, args: Job, ctx: Context): [Job] {
    const {prisma}: Context = ctx
    const {id}  = args

    if(id)
        return prisma.job.findMany()
  
    return prisma.job.findMany({
        where: {
            id: Number(id)
        }
    })
    
}



function publishedBy(parent: { id: number}, args: any, ctx: Context): User {
    const {prisma}: Context = ctx
    const {id} = parent

    return prisma.job.findOne({
        where: {
            id: Number(id)
        }
    }).users()
}


export const Query = {
    getJob
}


export const Job = {
    publishedBy
}