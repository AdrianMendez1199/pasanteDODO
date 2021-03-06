import { Context } from '../../..'
import { Job, ApplyJob } from '../Job'

export const Mutation = {
  /**
  * this function create Job
  * @param parent 
  * @param args 
  * @param ctx 
  */
  publishJob(_: void, args: { data: Job }, ctx: Context): object {
    const { prisma } = ctx
    const { publishedBy, categoryId, ...rest } = args.data

    return prisma.job.create({
      data: {
        ...rest,
        company: { connect: { id: Number(publishedBy) } },
        categories: { connect: { id: Number(categoryId) } }
      }
    })
  },


  async  applyToJob(parent: { id: number }, args: { userId: number; jobId: number }, ctx: Context): Promise<unknown> {
    const { prisma } = ctx
    const { userId, jobId } = args


    const userApplyToJob: Array<ApplyJob> = await prisma.applyJob.findMany({
      where: {
        userId: Number(userId),
        jobId: Number(jobId)
      }
    })

    if (userApplyToJob.length > 0) {
      throw new Error('you previously applied to this proposal')
    }

    return prisma.applyJob.create({
      data: {
        job: { connect: { id: Number(jobId) } },
        users: { connect: { id: Number(userId) } }
      }
    }).job()

  }

}