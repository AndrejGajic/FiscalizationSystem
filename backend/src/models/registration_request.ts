import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let RegistrationRequest = new Schema({
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
    }
});

export default mongoose.model('RegistrationRequest', RegistrationRequest, 'registration_requests');