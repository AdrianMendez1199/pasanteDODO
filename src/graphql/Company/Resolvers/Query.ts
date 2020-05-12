import { Context } from '../../..'
import { User } from '../../User/User'

/**
 * this function return 
 * all company 
 * @param parent 
 * @param args 
 * @param ctx 
 */
function getCompany(parent: { id: number }, args: { id: number }, ctx: Context): object {
  const { prisma }: Context = ctx
  const { id } = args

  if (!id) {
    return prisma.company.findMany()
  }

  return prisma.company.findMany({ where: { id: Number(id) } })

}

/**
 * return Job published by User
 * @param parent 
 * @param args 
 * @param ctx 
 * @return User
 */
async function userApplyToJob(parent: { id: number }, args: { jobId: number }, ctx: Context): Promise<User[]> {
  const { prisma }: Context = ctx

  const { jobId } = args

  const result: User[] = await prisma.raw`SELECT users.* FROM 
       apply_job INNER JOIN job ON "jobId" = job.id 
       INNER JOIN users ON users.id = apply_job."userId"
       WHERE "jobId" = ${Number(jobId)}`


  return result
}

export const Query = {
  getCompany, userApplyToJob
}


