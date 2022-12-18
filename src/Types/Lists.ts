import { Person } from "./Person";

export interface Lists{

    listId?: number;
    name:string;
    description:string;
    createdDate?:string;
    person?: Person;
    
}