require('dotenv').config();
const express = require('express');
const port = process.env.DB_PORT || 8000;
const db = require('./models');
const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

const customerRoute = require('./routes/customer.route');
const authRoute = require('./routes/auth.route');
const orderRoute = require('./routes/order.route');
const paymentRoute = require('./routes/payment.route');

app.use('/customer', customerRoute);
app.use('/auth', authRoute);
app.use('/order', orderRoute);
app.use('/payment', paymentRoute);

app.listen(port, async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log('App listen on port ' + port);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
