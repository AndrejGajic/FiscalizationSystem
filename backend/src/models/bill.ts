import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Bill = new Schema({
   id: {
      type: Number
   },
   companyUsername: {
      type: String
   },
   companyName: {
      type: String
   },
   storageId: {
      type: Number
   },
   storageName: {
      type: String
   },
   tableId: {
    type: Number
   },
   items: {
    type: Array
   },
   price: {
    type: Number
   },
   tax: {
      type: Number
   },
   active: {
    type: Boolean
   },
   payingMethod: {
    type: String
   },
   customerID: {
    type: String
   },
   payed: {
    type: Number
   },
   change: {
    type: Number
   },
   firstname: {
    type: String
   },
   lastname: {
    type: String
   },
   slip: {
    type: String
   },
   ordererUsername: {
    type: String
   },
   date: {
    type: String
   }


});

export default mongoose.model('Bill', Bill, 'bills');