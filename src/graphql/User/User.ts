import jwt from 'jsonwebtoken'


export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    orderBy?: orderByArgs;
}

export enum RoleOpt {
    EMPLOYER,
    EMPLOYEE
}


enum orderByArgs {
    asc,
    desc
}

export interface Role {
    name: RoleOpt;
    user_id: number;
    role_id: number;
}


export interface Login {
 token: string;
 data: User;
}


/**
 * this function return
 * jwt token
 * @param @User 
 */
export function genereteToken(User: User): string {
    const {name, lastname, email, phone} = User

    const tokenFormed = {
        name, lastname, email, phone
    }
    return jwt.sign({tokenFormed}, process.env.SECRET_TOKEN || '1212', {expiresIn: '2 days'})
}

/**
 * this function 
 * return decode token
 * @param @request 
 * @return @Object
 */
export function isAuthenticate(request: Record<string, any>): Record<string, any> | string{
    const header = request.get('authorization')

    if(!header)
        throw new Error('Authentication required')

    const token: string = header.replace('Bearer ', '')
    return jwt.verify(token,  process.env.SECRET_TOKEN || '1212')
} 

