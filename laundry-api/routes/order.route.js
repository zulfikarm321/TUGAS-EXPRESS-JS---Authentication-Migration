const route = require('express').Router();
const orderController = require('../controllers/order.controller');
const verifyJwtController = require('../controllers/verifyjwt.controller');

// CREATE
route.post('/', verifyJwtController.verify, orderController.create);

// READ
route.get('/', verifyJwtController.verify, orderController.get);
route.get('/:id', verifyJwtController.verify, orderController.getById);

// UPDATE
route.put('/:id', verifyJwtController.verify, orderController.update);

// DELETE
route.delete('/:id', verifyJwtController.verify, orderController.delete);

module.exports = route;
