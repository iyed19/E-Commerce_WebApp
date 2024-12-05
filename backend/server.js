const express = require('express');
const connect = require('./config/connectDB');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./routes/userRouter');
const products = require('./routes/productRouter');
const orders = require('./routes/orderRouter');
const path = require('path');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({ origin: '*' }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

dotenv.config({ path: 'backend/config/config.env' });

connect();


app.use('', users);
app.use('', products);
app.use('', orders);


const port = 5550;
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});