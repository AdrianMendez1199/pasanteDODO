export interface Company {
    data?: Array<Company>;
    id: number; 
    name: string;
    description: string;
    email: string;
    phone: string;
    websiteUrl: string;
}