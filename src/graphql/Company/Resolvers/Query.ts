import {Context} from '../../..'
import {ApplyJob} from '../../Jobs/Job'
import {User} from '../../User/User'

/**
 * this function return 
 * all company 
 * @param parent 
 * @param args 
 * @param ctx 
 */
function getCompany(parent: { id: number}, args: any, ctx: Context): object {
    const {prisma}: Context = ctx
    const {id}  = args

    if(!id)
        return prisma.company.findMany()
  
    return prisma.company.findMany({
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
 function userApplyToJob(parent: { id: number}, args: { jobId: number}, ctx: Context): void  {
    const {prisma}: Context = ctx
    const {jobId} = args

    // console.log(`
    // SELECT * FROM apply_job apj
    // INNER JOIN job jb ON "jobId" = jb.id
    // INNER JOIN users usr ON usr.id = "userId"
    // WHERE "jobId" = ${jobId};
    // `)

    // const result = await prisma.raw `SELECT users.email FROM apply_job INNER JOIN job ON 'jobId' = 
    //    job.id INNER JOIN users ON users.id = 'userId'  WHERE 'jobId' = ${jobId}; `


    // console.log(result)
    // const userApply: object  =  await prisma.apply_job.findOne({
    //    include:{
    //        users:jobId
    //    },
    // })
    


    // console.log(userApply)
    // const userInfoMap: Iterable<object> = await userApply.map(async (userJob: ApplyJob) => {
    //     return await prisma.users.findOne({
    //         where:{
    //             id: Number(userJob.id)
    //         }
    //     })
    // })
    //  console.log(await Promise.all(userInfoMap))
    // const userApplyJobInfo : object = await Promise.all(userInfoMap);
    // console.log(userApplyJobInfo)
    // return userApplyJobInfo
}

export const Query = {
    getCompany, userApplyToJob
}


