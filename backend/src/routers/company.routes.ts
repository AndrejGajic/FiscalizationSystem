import express from 'express';
import { CompanyController } from '../controllers/company.controller';

const companyRouter = express.Router();

companyRouter.route('/getCodes').get(
    (req, res) => new CompanyController().getCodes(req, res)
);

companyRouter.route('/updateCompanyInfo').post(
    (req, res) => new CompanyController().updateCompanyInfo(req, res)
);

companyRouter.route('/changeGeneralInfo').post(
    (req, res) => new CompanyController().changeGeneralInfo(req, res)
);

companyRouter.route('/addNewOrderer').post(
    (req, res) => new CompanyController().addNewOrderer(req, res)
);

companyRouter.route('/findCompaniesWithPIB').post(
    (req, res) => new CompanyController().findCompaniesWithPIB(req, res)
);

companyRouter.route('/getArticles').post(
    (req, res) => new CompanyController().getArticles(req, res)
);

companyRouter.route('/checkArticleId').post(
    (req, res) => new CompanyController().checkArticleId(req, res)
);

companyRouter.route('/insertArticle').post(
    (req, res) => new CompanyController().insertArticle(req, res)
);

companyRouter.route('/updateStorage').post(
    (req, res) => new CompanyController().updateStorage(req, res)
);

companyRouter.route('/deleteArticle').post(
    (req, res) => new CompanyController().deleteArticle(req, res)
);

companyRouter.route('/updateArticle').post(
    (req, res) => new CompanyController().updateArticle(req, res)
);

companyRouter.route('/addCategory').post(
    (req, res) => new CompanyController().addCategory(req, res)
);

companyRouter.route('/addSubcategory').post(
    (req, res) => new CompanyController().addSubcategory(req, res)
);

companyRouter.route('/getCompany').post(
    (req, res) => new CompanyController().getCompany(req, res)
);

companyRouter.route('/loadArticles').post(
    (req, res) => new CompanyController().loadArticles(req, res)
);

companyRouter.route('/addArticleToCategory').post(
    (req, res) => new CompanyController().addArticleToCategory(req, res)
);

companyRouter.route('/addArticleToSubcategory').post(
    (req, res) => new CompanyController().addArticleToSubcategory(req, res)
);

companyRouter.route('/loadBills').post(
    (req, res) => new CompanyController().loadBills(req, res)
);

companyRouter.route('/addItem').post(
    (req, res) => new CompanyController().addItem(req, res)
);

companyRouter.route('/finishBill').post(
    (req, res) => new CompanyController().finishBill(req, res)
);

companyRouter.route('/checkIfBillExists').post(
    (req, res) => new CompanyController().checkIfBillExists(req, res)
);

companyRouter.route('/addBill').post(
    (req, res) => new CompanyController().addBill(req, res)
);

companyRouter.route('/exportDailyReport').post(
    (req, res) => new CompanyController().exportDailyReport(req, res)
);

companyRouter.route('/addStorage').post(
    (req, res) => new CompanyController().addStorage(req, res)
);


export default companyRouter;
