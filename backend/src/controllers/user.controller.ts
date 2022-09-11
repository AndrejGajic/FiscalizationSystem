import * as express from 'express'
import RegistrationRequest from '../models/registration_request'
import Company from '../models/company'
import company from '../models/company';
import Customer from '../models/customer'
import User from '../models/user';
import Bill from '../models/bill';
import { json } from 'stream/consumers';

export class UserController {

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        User.findOne({'username':username, 'password':password}, (err, user) => {
            if(!user) {
                RegistrationRequest.findOne({'username':username, 'password':password}, (err, request) => {
                    if(request) {
                        res.json({'message':'Your request is waiting for approval from administrator!'});
                    }
                    else {
                        res.json({'message':'You have not registered to the system!'});
                    }
                });
            }
            else {
                res.json({'message':'OK', 'user':user});
            }
        });
    }

    getCompany = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        Company.findOne({'username':username, 'password':password}, (err, company) => {
            if(err || !company) {
                res.json({'message':'NOT FOUND'});
            }
            else {
                res.json({'message':'OK', 'company':company});
            }
        });
    }

    getCustomer = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        Customer.findOne({'username':username, 'password':password}, (err, customer) => {
            if(err || !customer) {
                res.json({'message':'NOT FOUND'});
            }
            else {
                res.json({'message':'OK', 'customer':customer});
            }
        });
    }

    register = (req: express.Request, res: express.Response) => {
        RegistrationRequest.findOne({$or: [
            {'username': req.body.username},
            {'email': req.body.email}
        ]}, (err, request) => {
            if(request) {
                res.json({'message': 'This company already exists!'});
            }
            else {
                let request = new RegistrationRequest(req.body);
                request.save().then((request) => {
                    res.status(200).json({'message':'OK'});
                }).catch((err) => {
                    res.status(400).json({'message': err});
                });
            }
        });
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;
        let password = req.body.password;
        let type = req.body.type;
        User.findOne({'username': req.body.username, 'password': oldPassword}, (err, user) => {
            if(!user) {
                res.json({'message':'NOT EXISTS'});
            }
            else {
                User.collection.updateOne({'username': req.body.username}, {$set: {'password':newPassword}});
                if(type == 'company') {
                    Company.findOne({'username': req.body.username, 'password': oldPassword}, (err, company) => {
                        if(!err) {
                            Company.collection.updateOne({'username': req.body.username}, {$set: {'password':newPassword}});
                            res.json({'message':'OK'});
                        }
                    });
                }
                else if(type == 'customer') {
                    Customer.findOne({'username': req.body.username, 'password': oldPassword}, (err, customer) => {
                        if(!err) {
                            Customer.collection.updateOne({'username': req.body.username}, {$set: {'password':newPassword}});
                            res.json({'message':'OK'});
                        }
                    });
                }
                else { // admin password already changed in collection Users
                    res.json({'message':'OK'});
                }
            }
        });
    }

    isCompanyVerified = (req: express.Request, res: express.Response) => {
        Company.findOne({'username': req.body.username}, (err, company) => {
            if(company) {
                if(company.verified == 1) {
                    res.json(true);
                }
                else {
                    res.json(false);
                }
            }
        });
    }

    getAllBills = (req: express.Request, res: express.Response) => {
        Bill.find({}, (err, bills) => {
            res.json({'bills':bills});
        });
    }

}