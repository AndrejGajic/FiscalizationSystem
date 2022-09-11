import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Company = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    company_name: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    postal_code: {
        type: String
    },
    street: {
        type: String
    },
    street_number: {
        type: String
    },
    pib: {
        type: String
    },
    company_number: {
        type: String
    },
    image: {
        type: String
    },
    verified: {
        type: Number
    },
    active: {
        type: Boolean
    },
    category: {
        type: String
    },
    codes: {
        type: Array
    },
    isPDV: {
        type: Boolean
    },
    bankAccounts: {
        type: Array
    },
    numOfStorages: {
        type: Number
    },
    storages: {
        type: Array
    },
    numOfCashRegisters: {
        type: Number
    },
    cashRegisters: {
        type: Array
    },
    orderers: {
        type: Array
    },
    categories: {
        type: Array
    },
    subcategories: {
        type: Array
    }

});

export default mongoose.model('Company', Company, 'companies');