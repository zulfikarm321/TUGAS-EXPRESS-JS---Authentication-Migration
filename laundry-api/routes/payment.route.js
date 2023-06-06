const route = require('express').Router();
const paymentController = require('../controllers/payment.controller');
const verifyJwtController = require('../controllers/verifyjwt.controller');

// CREATE
route.post('/:id', verifyJwtController.verify, paymentController.create);

// READ
route.get('/', verifyJwtController.verify, paymentController.get);
route.get('/:id', verifyJwtController.verify, paymentController.getById);

// UPDATE
route.put('/:id', verifyJwtController.verify, paymentController.update);

// DELETE
route.delete('/:id', verifyJwtController.verify, paymentController.delete);

module.exports = route;
