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