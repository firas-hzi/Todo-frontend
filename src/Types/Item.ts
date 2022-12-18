import { Lists } from "./Lists";

export interface Item{
    itemId?:number;
    name:string;
    description:string;
    price:number;
    list?: Lists;
}


export interface CreateItem{
    name:string;
    description:string;
    price:number;
    listId: number;
}