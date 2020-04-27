import jwt from 'jsonwebtoken'


export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    password: string
}

export enum RoleOpt {
    EMPLOYER,
    EMPLOYEE
}


export interface Role {
    name: RoleOpt
    user_id: number
    role_id: number
}


export interface Login {
 token: string;
 data: User;
}


/**
 * this function return
 * jwt token
 * @param User 
 */
export function genereteToken(User: User): string {
    const {name, lastname, email, phone} = User

    const tokenFormed = {
        name, lastname, email, phone
    }
    return jwt.sign({tokenFormed}, process.env.SECRET_TOKEN || '1212')
}

