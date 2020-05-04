
// import {orderByArgs} from '../User/User'

export interface Job {
    data?: Array<Job>;
    id: number;
    name: string;
    description: string | null;
    numberPositions: number | null;
    publishedBy: number;
    jobAvailable: 'YES' | 'NO' | null ;
    categoryId: number;
    orderBy?: any;
}


export enum jobAvailable {
    'YES',
    'NO'
}

export interface ApplyJob { 
 id: number;
 userId: number;
 jobId: number;
}

export interface Categories {
 id: number;
 name: string;
 description: string;
}