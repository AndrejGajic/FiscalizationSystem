import express from 'express';
import { UserController  } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
);

userRouter.route('/getCompany').post(
    (req, res) => new UserController().getCompany(req, res)
);

userRouter.route('/getCustomer').post(
    (req, res) => new UserController().getCustomer(req, res)
);

userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
);

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
);

userRouter.route('/isCompanyVerified').post(
    (req, res) => new UserController().isCompanyVerified(req, res)
);

userRouter.route('/getAllBills').get(
    (req, res) => new UserController().getAllBills(req, res)
);

export default userRouter;
