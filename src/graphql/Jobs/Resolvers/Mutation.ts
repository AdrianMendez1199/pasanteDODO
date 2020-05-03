import {Context} from '../../..'
import { Job,  JobCreate} from '../Job'

/**
  * this function create Job
  * @param parent 
  * @param args 
  * @param ctx 
  */
function publishJob(parent: { id: number}, args: {data: JobCreate}, ctx: Context): Promise<Job> {
    const {data} = args
    const {prisma} = ctx
   
    const {publishedBy, categoryId,  ...rest} = data
    return prisma.job.create({
        data:{
            ...rest,
            users: {
                connect: {id: Number(publishedBy)}
            }, 
            categories:{
                connect: {id: Number(categoryId)}
            }
        }
    })
}


export const Mutation = {
    publishJob
}