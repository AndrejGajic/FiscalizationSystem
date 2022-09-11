import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Article = new Schema({
    id: {
        type: String
    },
    companyUsername: {
        type: String
    },
    name: {
        type: String
    },
    unitOfMeasure: {
        type: String
    },
    taxRate: {
        type: Number
    },
    type: {
        type: String
    },
    origin: {
        type: String
    },
    originalName: {
        type: String
    },
    barcode: {
        type: String
    },
    manufacturer: {
        type: String
    },
    customsRate: {
        type: String
    },
    ecoTax: {
        type: Boolean
    },
    exciseTax: {
        type: Boolean
    },
    desiredStockMin: {
        type: Number
    },
    desiredStockMax: {
        type: Number
    },
    about: {
        type: String
    },
    declaration: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    }
});

export default mongoose.model('Article', Article, 'articles');