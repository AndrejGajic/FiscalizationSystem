import express from 'express';
import { CustomerController } from '../controllers/customer.controller';

const customerRouter = express.Router();

customerRouter.route('/loadCompanies').get(
    (req, res) => new CustomerController().loadCompanies(req, res)
);

customerRouter.route('/loadArticles').post(
    (req, res) => new CustomerController().loadArticles(req, res)
);

customerRouter.route('/loadBills').post(
    (req, res) => new CustomerController().loadBills(req, res)
);

export default customerRouter;