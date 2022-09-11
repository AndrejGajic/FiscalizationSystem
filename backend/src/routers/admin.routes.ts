import express from 'express';
import { AdminController } from '../controllers/admin.controller';
import { UserController  } from '../controllers/user.controller';

const adminRouter = express.Router();

adminRouter.route('/getAllRegistrationRequests').get(
    (req, res) => new AdminController().getAllRegistrationRequests(req, res)
);

adminRouter.route('/acceptRegistrationRequest').post(
    (req, res) => new AdminController().acceptRegistrationRequest(req, res)
);

adminRouter.route('/denyRegistrationRequest').post(
    (req, res) => new AdminController().denyRegistrationRequest(req, res)
);

adminRouter.route('/addCompany').post(
    (req, res) => new AdminController().addCompany(req, res)
);

adminRouter.route('/addCustomer').post(
    (req, res) => new AdminController().addCustomer(req, res)
);

adminRouter.route('/getCompanies').get(
    (req, res) => new AdminController().getCompanies(req, res)
);

adminRouter.route('/activateDeactivateCompany').post(
    (req, res) => new AdminController().activateDeactivateCompany(req, res)
);

adminRouter.route('/loadDailyReports').post(
    (req, res) => new AdminController().loadDailyReports(req, res)
);

adminRouter.route('/searchReports').post(
    (req, res) => new AdminController().searchReports(req, res)
);

export default adminRouter;
