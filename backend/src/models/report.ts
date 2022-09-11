import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Report = new Schema({
   companyUsername: {
      type: String
   },
   companyName: {
      type: String
   },
   pib: {
      type: String
   },
   date: {
      type: String
   },
   price: {
      type: Number
   },
   tax: {
      type: Number
   }
});

export default mongoose.model('Report', Report, 'reports');