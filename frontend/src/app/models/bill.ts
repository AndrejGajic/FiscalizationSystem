import { Item } from "./item";

export class Bill {
    id: number;
    companyUsername: string;
    companyName: string;
    storageId: number;
    storageName: string;
    tableId: number;
    items: Array<Item>;
    price: number;
    tax: number;
    active: boolean;
    payingMethod: string;
    customerID: string;
    payed: number;
    change: number;
    firstname: string;
    lastname: string;
    slip: string;
    ordererUsername: string;
    date: string;
}