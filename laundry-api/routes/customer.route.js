const route = require('express').Router();
const customerController = require('../controllers/customer.controller');
const verifyJwtController = require('../controllers/verifyjwt.controller');

// READ
route.get('/', customerController.getCustomers);
route.get('/:id', customerController.getCustomerById);

// UPDATE
route.put('/:id', verifyJwtController.verify, customerController.update);

// DELETE
route.delete('/:id', verifyJwtController.verify, customerController.delete);

module.exports = route;
