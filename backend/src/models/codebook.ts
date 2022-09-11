import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Codebook = new Schema({
    codes: {
        type: Array
    }
});

export default mongoose.model('Codebook', Codebook, 'codebooks');