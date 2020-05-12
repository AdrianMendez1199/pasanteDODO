import { OrderByArg } from '../../utils'

export interface Job {
  data?: Array<Job>;
  id: number;
  name: string;
  description: string | null;
  numberPositions: number | null;
  publishedBy: number;
  jobAvailable: 'YES' | 'NO' | null;
  categoryId: number;
  orderBy?: jobOrderByInput | null;
}


export type jobOrderByInput = {
  categoryId?: OrderByArg | null;
  companyId?: OrderByArg | null;
  createdAt?: OrderByArg | null;
  description?: OrderByArg | null;
  id?: OrderByArg | null;
  jobAvailable?: OrderByArg | null;
  name?: OrderByArg | null;
  numberPositions?: OrderByArg | null;
  updatedAt?: OrderByArg | null;
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