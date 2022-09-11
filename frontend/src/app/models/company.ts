import { BankAccount } from "./bank_account";
import { CashRegister } from "./cash_register";
import { Orderer } from "./orderer";
import { Storage } from "./storage";

export class Company {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    company_name: string;
    state: string;
    city: string;
    postal_code: string;
    street: string;
    street_number: string;
    pib: string;
    company_number: string;
    image: string;
    verified: number;
    active: boolean;
    category: string;
    codes: Array<string>;
    isPDV: boolean;
    bankAccounts: Array<BankAccount>;
    numOfStorages: number;
    storages: Array<Storage>;
    numOfCashRegisters: number;
    cashRegisters: Array<CashRegister>;
    orderers: Array<Orderer>;
    categories: Array<String>;
    subcategories: Array<String>;
}