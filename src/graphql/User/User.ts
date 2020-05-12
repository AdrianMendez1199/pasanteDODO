import jwt from 'jsonwebtoken'
import { Context } from '../../'
import bcrypt from 'bcrypt'
import { OrderByArg } from '../../utils'



export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  orderBy?: orderByUserInput | null;
}


type orderByUserInput = {
  id: OrderByArg | null;
  name: OrderByArg | null;
  lastname: OrderByArg | null;
  email: OrderByArg | null;
  phone: OrderByArg | null;
  password: OrderByArg | null;
}

export enum RoleOpt {
  EMPLOYER,
  EMPLOYEE
}


export interface Role {
  name: RoleOpt;
  userId: number;
  roleId: number;
}


export interface Login {
  token: string;
  data: User;
}

export interface Request {
  get: (p: string) => string;
}



export interface Profile {
  data: Array<Profile>;
  id: number;
  description?: string;
  endDate?: Date;
  institution: string;
  position: string;
  startDate: Date;
  userId: number;
}


/**
 * this function return
 * jwt token
 * @param @User 
 */
export function genereteToken(User: User, roleId: number): string {
  const { name, lastname, email, phone } = User

  const tokenFormed = {
    name, lastname, email, phone, roleId
  }

  return jwt.sign({ tokenFormed }, process.env.SECRET_TOKEN || '1212', { expiresIn: '2 days' })
}

/**
 * this function 
 * return decode token
 * @param @request 
 * @return @Object
 */
export function isAuthenticate(request: Request): object | string {
  const header = request.get('authorization')

  if (!header) {
    throw new Error('Authentication required')
  }

  return jwt.verify(header.replace('Bearer ', ''),
    process.env.SECRET_TOKEN || '1212')
}


/**
 * create user with your role
 * @param user 
 * @param context 
 * @return @promise<User>
 */
export async function createUserAndRole(user: User, context: Context): Promise<User> {

  const { prisma } = context
  const salt = await bcrypt.genSalt(10)

  user.password = await bcrypt.hash(user.password, salt)

  const userCreated: User = await prisma.users
    .create({ data: { ...user } })

  await prisma.userRole.create({
    data: {
      role: { connect: { id: 1 } },
      users: { connect: { id: userCreated.id } }
    }
  })

  return userCreated
}