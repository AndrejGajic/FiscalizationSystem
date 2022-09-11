import * as express from 'express'
import User from '../models/user';
import RegistrationRequest from '../models/registration_request'
import Company from '../models/company';
import Customer from '../models/customer';
import Report from '../models/report';
import { read } from 'fs';
import { rawListeners, report } from 'process';

export class AdminController {

    getAllRegistrationRequests = (req: express.Request, res: express.Response) => {
        RegistrationRequest.find({}, (err, requests) => {
            if(!err && requests) {
                res.json(requests);
            }
            else res.json(null);
        })
    }

    acceptRegistrationRequest = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        RegistrationRequest.findOneAndDelete({'username':username}, (err, request) => {
            if(!err && request) {
                let userData = {
                    username: request.username,
                    password: request.password,
                    type: 'company'
                }
                let user = new User(userData);
                user.save();
                console.log('User ' + request.username + ' saved!');
                let companyData = {
                    firstname: request.firstname,
                    lastname: request.lastname,
                    username: request.username,
                    password: request.password,
                    phone: request.phone,
                    email: request.email,
                    company_name: request.company_name,
                    state: request.state,
                    city: request.city,
                    postal_code: request.postal_code,
                    street: request.street,
                    street_number: request.street_number,
                    pib: request.pib,
                    company_number: request.company_number,
                    image: request.image,
                    verified: 0,
                    active: true,
                    category: '',
                    codes: [],
                    isPDV: false,
                    bankAccounts: [],
                    numOfStorages: 0,
                    storages: [],
                    numOfCashRegisters: 0,
                    cashRegisters: [],
                    categories: [],
                    subcategories: []
                }
                let company = new Company(companyData);
                company.save();
                console.log('Company ' + request.company_name + ' saved!');
                res.json('OK');
            }
            else {
                res.json("FAILED");
            }
        });
    }

    denyRegistrationRequest = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        RegistrationRequest.findOneAndDelete({'username':username}, (err, request) => {
            if(!err && request) {
                let userData = {
                    username: request.username,
                    password: request.password,
                    type: 'company'
                }
                let user = new User(userData);
                user.save();
                console.log('User ' + request.username + ' saved!');
                let companyData = {
                    firstname: request.firstname,
                    lastname: request.lastname,
                    username: request.username,
                    password: request.password,
                    phone: request.phone,
                    email: request.email,
                    company_name: request.company_name,
                    state: request.state,
                    city: request.city,
                    postal_code: request.postal_code,
                    street: request.street,
                    street_number: request.street_number,
                    pib: request.pib,
                    company_number: request.company_number,
                    image: request.image,
                    verified: 0,
                    active: false,
                    category: '',
                    codes: [],
                    isPDV: false,
                    bankAccounts: [],
                    numOfStorages: 0,
                    storages: [],
                    numOfCashRegisters: 0,
                    cashRegisters: [],
                    categories: [],
                    subcategories: []
                }
                let company = new Company(companyData);
                company.save();
                console.log('Company ' + request.company_name + ' saved!');
                res.json('OK');
            }
            else {
                res.json("FAILED");
            }
        });
    }

    addCompany = (req: express.Request, res: express.Response) => {
        Company.findOne({$or: [
            {'username': req.body.username},
            {'email': req.body.email}
        ]}, (err, company) => {
            if(company) {
                res.json({'message': 'Company with this username or email already exists!!'});
            }
            else {
                let company = new Company(req.body);
                company.save();
                RegistrationRequest.deleteOne({'username': req.body.username}); // delete from requests if there is company with same data
                res.json({'message':'OK'});
            }
        });
    }

    addCustomer = (req: express.Request, res: express.Response) => {
        Customer.findOne({'username': req.body.username}, (err, customer) => {
            if(customer) {
                res.json({'message': 'Customer with this username or email already exists!!'});
            }
            else {
                let customer = new Customer(req.body);
                customer.save();
                const data = {
                    username: req.body.username,
                    password: req.body.password,
                    type: 'customer'
                };
                let user = new User(data);
                user.save();
                res.json({'message':'OK'});
            }
        });
    }

    getCompanies = (req: express.Request, res: express.Response) => {
        Company.find({}, (err, companies) => {
            if(!err) {
                res.json({'companies':companies});
            }
            else {
                res.json({'companies':[]});
            }
        })
    }

    activateDeactivateCompany = (req: express.Request, res: express.Response) => {
        Company.updateOne({'username':req.body.username}, {$set: {'active':req.body.active}}).then((company) => {
            if(company) {
                res.json({'status':'OK'});
            }
            else {
                res.json({'status':'ERROR'});
            }
        })
    }
    

    loadDailyReports = (req: express.Request, res: express.Response) => {
        Report.find({'date':req.body.date}, (err, reports) => {
            res.json({'reports':reports});
        });
    }

    dateBefore(date1, date2) {
        let date1Arr = date1.split('-');
        let date2Arr = date2.split('-');
        let year1 = Number(date1Arr[0]);
        let month1 = Number(date1Arr[1]);
        let day1 = Number(date1Arr[2]);
        let year2 = Number(date1Arr[0]);
        let month2 = Number(date2Arr[1]);
        let day2 = Number(date2Arr[2]);
        if(year1 < year2 || (year1 == year2 && month1 < month2 || (year1 == year2 && month1 == month2 && day1 < day2))) return true;
        return false;
    }

    datesOk(reportDate, startDate, endDate) {
        if(this.dateBefore(reportDate, startDate)) return false;
        if(this.dateBefore(endDate, reportDate)) return false;
        return true;
    }

    searchReports = (req: express.Request, res: express.Response) => {
        let companyName = req.body.companyName;
        let pib = req.body.pib;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let retReports = [];
        if(companyName == '' && pib == '') {
            Report.find({}, (err, reports) => {
                for(let i = 0; i < reports.length; i++) {
                    if(this.datesOk(reports[i].date, startDate, endDate)) {
                        retReports.push(reports[i]);
                    }
                }
                res.json({'reports':retReports});
            });
        }
        else if(companyName == '') {
            Report.find({'pib':pib}, (err, reports) => {
                for(let i = 0; i < reports.length; i++) {
                    if(this.datesOk(reports[i].date, startDate, endDate)) {
                        retReports.push(reports[i]);
                    }
                }
                res.json({'reports':retReports});
            });
        }
        else if(pib == '') {
            Report.find({'companyName':companyName}, (err, reports) => {
                for(let i = 0; i < reports.length; i++) {
                    if(this.datesOk(reports[i].date, startDate, endDate)) {
                        retReports.push(reports[i]);
                    }
                }
                res.json({'reports':retReports});
            });
        }
        else {
            Report.find({'companyName':companyName, 'pib':pib}, (err, reports) => {
                for(let i = 0; i < reports.length; i++) {
                    if(this.datesOk(reports[i].date, startDate, endDate)) {
                        retReports.push(reports[i]);
                    }
                }
                res.json({'reports':retReports});
            });
        }
    }
}