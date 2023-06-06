const { Payment, Order } = require('../models');
const order = require('../models/order');

module.exports = {
    async create(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);

            if (!order) {
                return res.status(400).send({
                    message: 'order not found'
                });
            }

            if (order.customerId !== req.userId) {
                return res.status(401).send({
                    message: 'didnt have access'
                });
            }

            await Payment.create({
                orderId: req.params.id,
                total_amount: order.quantity * 10000
            });

            res.status(200).send({
                id: req.params.id,
                message: 'payment successfully'
            });
        } catch (error) {
            res.status(500).send({
                message: 'Error',
                errors: error
            });
        }
    },
    async get(req, res) {
        try {
            const payments = await Payment.findAll();

            res.status(200).send(payments);
        } catch (error) {
            res.status(500).send({
                message: 'Error',
                errors: error
            });
        }
    },
    async getById(req, res) {
        try {
            const payment = await Payment.findByPk(req.params.id);

            if (!payment) {
                res.status(400).send({
                    message: 'payment not found'
                });
            }

            res.status(200).send(payment);
        } catch (error) {
            res.status(500).send({
                message: 'Error',
                errors: error
            });
        }
    },
    async update(req, res) {
        try {
            const payment = await Payment.findByPk(req.params.id, {
                include: [Order]
            });

            if (payment.Order.customerId !== req.userId) {
                return res.status(401).send({
                    message: 'didnt have access'
                });
            }

            const statusOption = ['pending', 'paid'];
            if (!statusOption.includes(req.body.status)) {
                return res.status(400).send({
                    message: 'status must be pending or paid'
                });
            }

            payment.status = req.body.status || payment.status;

            await payment.save();

            res.status(200).send({
                id: req.params.id,
                message: 'payment status updated'
            });
        } catch (error) {
            res.status(500).send({
                message: 'Error',
                errors: error
            });
        }
    },
    async delete(req, res) {
        try {
            const payment = await Payment.findByPk(req.params.id, {
                include: [Order]
            });

            if (payment.Order.customerId !== req.userId) {
                return res.status(401).send({
                    message: 'didnt have access'
                });
            }

            await payment.destroy();

            res.status(200).send({
                id: req.params.id,
                message: 'payment deleted'
            });
        } catch (error) {
            res.status(500).send({
                message: 'Error',
                errors: error
            });
        }
    }
};
