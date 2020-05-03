
export interface Job {
    id: number;
    name: string;
    description: string | null;
    numberPositions: number | null;
    publishedBy: number;
    jobAvailable: 'YES' | 'NO' | null ;
    categoryId: number;
}

export interface JobCreate {
    name: string;
    description: string | null;
    numberPositions: number | null;
    publishedBy: number;
    jobAvailable: 'YES' | 'NO' | null ;
    categoryId: number;
    users: unknown;
    categories: unknown;
}


export enum jobAvailable {
    'YES',
    'NO'
}


