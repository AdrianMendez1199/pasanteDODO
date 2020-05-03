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


async function applyToJob(parent: { id: number}, args: {userId: number, jobId: number}, ctx: Context) {
  const {prisma} = ctx
  const {userId, jobId} = args


  const userApplyToJob : Array<Object>  = await prisma.apply_job.findMany({
    where:{
        userId: Number(userId),
        jobId: Number(jobId)
    }
  })

  if(userApplyToJob.length > 0)
    throw new Error(`you previously applied to this proposal`)

  return prisma.apply_job.create({
     data: {
         job:{connect: {id: Number(jobId)}},
         users: {connect: {id: Number(userId)}}
     }
  }).job()

}

export const Mutation = {
    publishJob, applyToJob
}