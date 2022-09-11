import * as express from 'express'
import User from '../models/user';
import RegistrationRequest from '../models/registration_request'
import Company from '../models/company';
import Customer from '../models/customer';
import Article from '../models/article';
import Bill from '../models/bill';
import Report from '../models/report';
import Codebook from '../models/codebook';

export class CompanyController {

    getCodes = (req: express.Request, res: express.Response) => {
        Codebook.find({}, (err, codes) => {
            res.json({'codes':codes});
        });
    }
    
    updateCompanyInfo = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let verified = 1;
        let category = req.body.category;
        let codes = req.body.codes;
        let isPDV = req.body.isPDV;
        let bankAccounts = req.body.bankAccounts;
        let numOfStorages = req.body.numOfStorages;
        let storages = req.body.storages;
        let numOfCashRegisters = req.body.numOfCashRegisters;
        let cashRegisters = req.body.cashRegisters;

        Company.updateOne({'username':username}, {$set: {
            'verified': verified,
            'category': category,
            'codes': codes,
            'isPDV': isPDV,
            'bankAccounts': bankAccounts,
            'numOfStorages': numOfStorages,
            'storages': storages,
            'numOfCashRegisters': numOfCashRegisters,
            'cashRegisters': cashRegisters
        }}).then((obj) => {
            if(obj) {
                res.json({'status':1});
            }
            else {
                res.json({'status':0});
            }
        })
    }

    changeGeneralInfo = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let phone = req.body.phone;
        let category = req.body.category;
        let codes = req.body.codes;
        let isPDV = req.body.isPDV;
        Company.collection.updateOne({'username':username}, {$set: {
            'firstname': firstname,
            'lastname': lastname,
            'username': username,
            'email': email,
            'phone': phone,
            'category': category,
            'codes': codes,
            'isPDV': isPDV
        }}).then((json) => {
            res.json({'status':'OK'});
        }).catch((err) => {
            res.json({'status':'ERROR'});
        });
    }

    addNewOrderer = (req: express.Request, res: express.Response) => {
        let username = req.body.myUsername;
        Company.findOne({'username':username}, (err, company) => {
            if(company) {
                if(!company.active) {
                    res.json({'message':'Company is not activated!'});
                } 
                else if(company.verified == 0) {
                    res.json({'message':'Company is not verified!'});
                }
                else {
                    let found = false;
                    for(let i = 0; i < company.orderers.length; i++) {
                        if(company.orderers[i].username == req.body.username && company.orderers[i].pib == req.body.pib) {
                            found = true;
                            break;
                        }
                    }
                    if(found) {
                        res.json({'message':'Orderer already exists!'});
                    }
                    else {
                        let orderer = {
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            username: req.body.username,
                            phone: req.body.phone,
                            email: req.body.email,
                            company: req.body.companyName,
                            state: req.body.state,
                            city: req.body.city,
                            postalCode: req.body.postalCode,
                            street: req.body.street,
                            street_number: req.body.streetNumber,
                            pib: req.body.pib,
                            company_number: req.body.companyNumber,
                            daysForPaying: req.body.daysForPaying,
                            percentageOfRebate: req.body.percentageOfRebate
                        };
                        company.orderers.push(orderer);
                        company.save();
                        res.json({'message':'OK'});
                    }
                }
            }
            else {
                res.json({'message':'ERROR'});
            }
        });
    }

    findCompaniesWithPIB = (req: express.Request, res: express.Response) => {
        let pib = req.body.pib;
        Company.find({'pib':pib}, (err, companies) => {
            if(err) {
                res.json({'message':'ERROR'});
            }
            else {
                res.json({'message':'OK', 'companies':companies});
            }
        });
    }

    getArticles = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        Article.find({'companyUsername':username}, (err, articles) => {
            if(err) {
                res.json({'message':'ERROR'});
            }
            else {
                res.json({'message':'OK', 'articles':articles});
            }
        });
    }

    checkArticleId = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let username = req.body.username;
        Article.findOne({'id':id, 'company':username}, (err, article) => {
            if(article) {
                res.json(1);
            }
            else {
                res.json(0);
            }
        })
    }

    insertArticle = (req: express.Request, res: express.Response) => {
        let article = new Article(req.body);
        article.save().then((request) => {
            res.json({'status':'OK'});
        }).catch((err) => {
            res.json({'status':err});
        });
    }

    updateStorage = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let storageId = req.body.storageId;
        let article = req.body.article;
        Company.updateOne({
            'username': username,
            'storages.id': storageId
        }, 
        {
            $push: {'storages.$.articles': article}
        }, (err, resp) => {
            if(!err) {
                res.json({'status':'OK'});
            }
            else {
                res.json({'status':'ERROR'});
            }
        });
    }

    deleteArticle = (req: express.Request, res: express.Response) => {
        let articleId = req.body.articleId;
        let username = req.body.username;
        let change = false;
        Company.findOne({'username':username}, (err2, company) => {
            if(!err2) {
                let storages = company.storages;
                for(let i = 0; i < storages.length; i++) {
                    if(storages[i].articles != []) {
                        let index = -1;
                        for(let j = 0; j < storages[i].articles.length; j++) {
                            if(storages[i].articles[j].id == articleId) {
                                index = j;
                                break;
                            }
                        }
                        if(index != -1) {
                            storages[i].articles.splice(index, 1);
                            change = true;
                        }
                    }
                }
                if(change) {
                    Company.updateOne({'username':username}, {$set: {'storages':storages}});
                }
            }
        });
        Article.findOneAndDelete({'id':articleId}, (err, article) => {
            if(!err) {
                res.json({'status':'OK'});
            }
            else {
                res.json({'status':'ERROR'});
            }
        });
    }

    updateArticle = (req: express.Request, res: express.Response) => {

    }
    
    addCategory = (req: express.Request, res: express.Response) => {
        Company.updateOne({'username':req.body.username}, {$push: {'categories':req.body.category}}, (err, category) => {
            if(!err) {
                res.json({'status':'OK'});
            }
            else {
                res.json({'status':'ERROR'});
            }
        });
    }

    addSubcategory = (req: express.Request, res: express.Response) => {
        Company.updateOne({'username':req.body.username}, {$push: {'subcategories':req.body.subcategory}}, (err, subcategory) => {
            if(!err) {
                res.json({'status':'OK'});
            }
            else {
                res.json({'status':'ERROR'});
            }
        });
    }

    getCompany = (req: express.Request, res: express.Response) => {
        Company.findOne({'username':req.body.username}, (err, company) => {
            res.json({'company':company});
        });
    }

    loadArticles = (req: express.Request, res: express.Response) => {
        Article.find({'companyUsername':req.body.username}, (err, articles) => {
            res.json({'articles':articles});
        });
    }

    addArticleToCategory = (req: express.Request, res: express.Response) => {
        Article.findOne({'name':req.body.name, 'companyUsername':req.body.companyUsername}, (err, article) => {
            if(!article) {
                res.json({'status':'ERROR'});
            }
            else {
                if(article.category != '' && article.category != undefined) {
                    res.json({'status':'EXISTS', 'article':article});
                }
                else {
                    article.category = req.body.category;
                    article.save();
                    res.json({'status':'OK'});
                }
            }
        });
    }

    addArticleToSubcategory = (req: express.Request, res: express.Response) => {
        Article.findOne({'name':req.body.name, 'companyUsername':req.body.companyUsername}, (err, article) => {
            if(!article) {
                res.json({'status':'ERROR'});
            }
            else {
                if(article.subcategory != '' && article.subcategory != undefined) {
                    res.json({'status':'EXISTS', 'article':article});
                }
                else if(article.category != req.body.subcategory.split('#')[0]) {
                    res.json({'status':'CATEGORY_BAD', article:article});
                }
                else {
                    article.subcategory = req.body.subcategory;
                    article.save();
                    res.json({'status':'OK'});
                }
            }
        });
    }

    loadBills = (req: express.Request, res: express.Response) => {
        Bill.find({'companyUsername':req.body.companyUsername, 'active':req.body.active}, (err, bills) => {
            if(bills) {
                res.json({'status':'OK', 'bills':bills});
            }
            else {
                res.json({'status':'ERROR'});
            }
        })
    }

    addItem = (req: express.Request, res: express.Response) => {
        let companyUsername = req.body.companyUsername;
        let id = req.body.id;
        let item = req.body.item;
        Bill.updateOne({'id':id,'companyUsername':companyUsername}, {
            $inc: {
                'price': item.price,
                'tax': req.body.tax
            },
            $push: {
                'items': item
            }
        }).then((info) => {
            res.json({'status':'OK'});
        });
    }
    
    padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }

    calculateDate() {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        return [
            date.getFullYear(),
            this.padTo2Digits(date.getMonth() + 1),
            this.padTo2Digits(date.getDate())
        ].join('-');
    }

    finishBill = (req: express.Request, res: express.Response) => {
        let companyUsername = req.body.companyUsername;
        let id = req.body.id;
        let date = this.calculateDate();
        Bill.updateOne({'id':id, 'companyUsername':companyUsername}, {$set: {
            'active': false,
            'payingMethod': req.body.payingMethod,
            'customerID': req.body.customerID,
            'payed': req.body.payed,
            'change': req.body.change,
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'slip': req.body.slip,
            'ordererUsername': req.body.ordererUsername,
            'date': date
        }}).then((data) => {
            if(data) {
                res.json({'status':'OK'});
            }
            else {
                res.json({'status':'ERROR'});
            }
        })
    }

    checkIfBillExists = (req: express.Request, res: express.Response) => {
        Bill.findOne({'companyUsername':req.body.companyUsername, 'storageId':req.body.storageId, 'tableId':req.body.tableId, 'active':true}, (err, bill) => {
            if(!bill || bill == undefined) {
                res.json({'status':'OK'});
            }
            else {
                res.json({'status':'EXISTS'});
            }
        });
    }

    addBill = (req: express.Request, res: express.Response) => {
        let bill = new Bill(req.body);
        bill.save().then((bill) => {
            if(bill) {
                res.json({'status':'OK'});
            }
            else {
                res.json({'status':'ERROR'});
            }
        });
    }

    exportDailyReport = (req: express.Request, res: express.Response) => {
        Report.findOne({'companyUsername':req.body.companyUsername, 'date':req.body.date}, (err, report) => {
            if(!report || report == undefined) {
                let report = new Report(req.body);
                report.save();
                res.json({'status':'OK'});
            }
            else {
                report.price = req.body.price;
                report.tax = req.body.tax;
                report.save();
                res.json({'status':'OK'});
            }
        })
    }

    addStorage = (req: express.Request, res: express.Response) => {
        let username = req.body.companyUsername;
        const storage = {
            id: req.body.id,
            name: req.body.name,
            articles: req.body.articles,
            tables: req.body.tables
        };
        Company.updateOne({'username':username}, {
            $push: {
                'storages':storage
            },
            $inc: {
                'numOfStorages':1
            }
        }).then((json) => {
            res.json({'status':'OK'});
        }).catch((err) => {
            res.json({'status':'ERROR'});
        });
    }
}