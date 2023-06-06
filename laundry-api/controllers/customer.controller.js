const Customer = require('../models').Customer;
const bcrypt = require('bcryptjs');

module.exports = {
    async getCustomers(req, res) {
        try {
            const customers = await Customer.findAll();

            res.status(200).send(customers);
        } catch (error) {
            res.status(500).send({
                message: 'Failed to get Data',
                errors: error
            });
        }
    },
    async getCustomerById(req, res) {
        try {
            const customer = await Customer.findByPk(req.params.id);

            if (!customer) {
                return res.status(400).send({
                    id: req.params.id,
                    message: 'user not found'
                });
            }

            res.status(200).send(customer);
        } catch (error) {
            res.status(500).send({
                message: 'Failed to get Data',
                errors: error
            });
        }
    },
    async update(req, res) {
        try {
            const customer = await Customer.findByPk(req.params.id);

            if (!customer) {
                return res.status(400).send({
                    id: req.params.id,
                    message: 'user not found'
                });
            }

            if (customer.id !== req.userId) {
                return res.status(401).send({
                    message: 'Didnt have access'
                });
            }

            customer.name = req.body.name || customer.name;
            customer.email = req.body.email || customer.email;
            customer.password =
                bcrypt.hashSync(req.body.password, 8) || customer.password;

            await customer.save();

            res.status(200).send({
                id: req.params.id,
                message: 'id updated successfully'
            });
        } catch (error) {
            res.status(500).send({
                message: 'Failed',
                errors: error
            });
        }
    },
    async delete(req, res) {
        try {
            const customer = await Customer.findByPk(req.params.id);

            if (!customer) {
                return res.status(400).send({
                    id: req.params.id,
                    message: 'user not found'
                });
            }

            if (customer.id !== req.userId) {
                return res.status(401).send({
                    message: 'Didnt have access'
                });
            }

            await customer.destroy();

            res.status(200).send({
                id: req.params.id,
                message: 'id deleted successfully'
            });
        } catch (error) {
            res.status(500).send({
                message: 'Failed',
                errors: error
            });
        }
    }
};
