import { Lists } from "./Lists";

export interface Item{
    itemId?:number;
    name:string;
    description:string;
    price:number;
    list: Lists;
}