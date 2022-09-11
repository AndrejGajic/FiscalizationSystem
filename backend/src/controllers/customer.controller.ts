import * as express from 'express'
import User from '../models/user';
import RegistrationRequest from '../models/registration_request'
import Company from '../models/company';
import Customer from '../models/customer';
import Report from '../models/report';
import Article from '../models/article';
import Bill from '../models/bill';

export class CustomerController {

    loadCompanies = (req: express.Request, res: express.Response) => {
        Company.find({}, (err, companies) => {
            res.json({'companies':companies});
        })
    }

    loadArticles = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        let manufacturer = req.body.manufacturer;
        if(name == '' && manufacturer == '') {
            Article.find({}, (err, articles) => {
                res.json({'articles':articles});
            });
        }
        else if(name == '') {
            Article.find({'manufacturer':manufacturer}, (err, articles) => {
                res.json({'articles':articles});
            });
        }
        else if(manufacturer == '') {
            Article.find({'name':name}, (err, articles) => {
                res.json({'articles':articles});
            });
        }
        else {
            Article.find({'name':name, 'manufacturer':manufacturer}, (err, articles) => {
                res.json({'articles':articles});
            });
        }
    }

    loadBills = (req: express.Request, res: express.Response) => {
        Bill.find({'customerID':req.body.customerID}, (err, bills) => {
            res.json({'bills':bills});
        });
    }

}