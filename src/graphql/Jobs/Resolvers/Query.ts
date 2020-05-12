import { Context } from '../../..'
import { Job as JobInterface } from '../Job'

export const Query = {
  /**
   * this function return 
   * all job 
   * @param parent 
   * @param args 
   * @param ctx 
   */
  getJob(parent: { id: number }, args: JobInterface, ctx: Context): Promise<object[]> {
    const { prisma }: Context = ctx
    const { id, orderBy } = args

    if (!id) {
      return prisma.job.findMany({ orderBy })
    }

    return prisma.job
      .findMany({ where: { id: Number(id) } })

  }
}


export const Job = {
  /**
  * return Job published by User
  * @param parent 
  * @param args 
  * @param ctx 
  * @return User
  */
  async publishedBy(parent: { id: number }, args: { id: number }, ctx: Context): Promise<unknown> {
    const { prisma }: Context = ctx
    const { id } = parent

    return prisma.job
      .findOne({ where: { id: Number(id) } })
      .company()
  },

  /**
   *  return quantity User apply to Job
   * @param parent 
   * @param args 
   * @param ctx 
   */
  async quantityAppliedToJob(parent: { id: number }, args: { jobId: number }, ctx: Context): Promise<object> {
    const { prisma }: Context = ctx

    const { id } = parent


    const quantity = await prisma.applyJob
      .count({ where: { jobId: Number(id) } })

    return { quantity }
  },

  /**
   * return categories about jobs
   * @param parent 
   * @param args 
   * @param ctx 
   */
  categoryType(parent: { id: number }, args: { id: number }, ctx: Context): object {
    const { id } = parent
    const { prisma } = ctx

    return prisma.job
      .findOne({ where: { id: Number(id) } })
      .categories()
  }

}