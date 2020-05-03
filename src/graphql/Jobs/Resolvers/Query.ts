import {Context} from '../../..'
import { Job as JobInterface} from '../Job'


/**
 * this function return 
 * all job 
 * @param parent 
 * @param args 
 * @param ctx 
 */
function getJob(parent: { id: number}, args: JobInterface, ctx: Context): Promise<JobInterface[]>   {
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

/**
 * return Job published by User
 * @param parent 
 * @param args 
 * @param ctx 
 * @return User
 */
async function publishedBy(parent: { id: number}, args: {id: number}, ctx: Context): Promise<unknown>  {
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