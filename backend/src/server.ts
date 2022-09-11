import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes'
import adminRouter from './routers/admin.routes';
import companyRouter from './routers/company.routes';
import customerRouter from './routers/customer.routes';


const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/fiscalization');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection with database FISCALIZATION ok!");
})

const router = express.Router();
router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/company', companyRouter);
router.use('/customer', customerRouter);

app.use('/', router);

app.get('/', (req, res) => {console.log('aaa'); res.send('Hello World!')});

app.listen(4000, () => console.log(`Express server running on port 4000`));