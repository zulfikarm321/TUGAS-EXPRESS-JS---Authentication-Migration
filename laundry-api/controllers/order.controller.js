const Order = require('../models').Order;

module.exports = {
    async get(req, res) {
        try {
            const orders = await Order.findAll();

            res.status(200).send(orders);
        } catch (error) {
            res.status(500).send({
                id: req.body.id,
                message: 'Error',
                errors: error
            });
        }
    },
    async getById(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);

            if (!order) {
                return res.status(400).send({
                    id: req.params.id,
                    message: 'order not found'
                });
            }

            res.status(200).send(order);
        } catch (error) {
            res.status(500).send({
                id: req.body.id,
                message: 'Error',
                errors: error
            });
        }
    },
    async create(req, res) {
        try {
            const order = await Order.create({
                customerId: req.userId,
                quantity: req.body.quantity,
                orderDate: new Date()
            });

            res.status(200).send({
                id: order.id,
                message: 'Order Created'
            });
        } catch (error) {
            res.status(500).send({
                id: req.body.id,
                message: 'Error',
                errors: error
            });
        }
    },
    async update(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);

            if (!order) {
                return res.status(400).send({
                    id: req.params.id,
                    message: 'order not found'
                });
            }

            if (order.customerId !== req.userId) {
                return res.status(401).send({
                    id: req.params.id,
                    message: 'Didnt have access'
                });
            }

            const statusOption = ['pending', 'process', 'done'];
            if (!statusOption.includes(req.body.status)) {
                return res.status(400).send({
                    message: 'status must be pending, process, or done'
                });
            }

            order.quantity = req.body.quantity || order.quantity;
            order.status = req.body.status || order.status;

            await order.save();

            res.status(200).send({
                orderId: req.params.id,
                message: 'Order successfully updated'
            });
        } catch (error) {
            res.status(500).send({
                id: req.body.id,
                message: 'Error',
                errors: error
            });
        }
    },
    async delete(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);

            if (!order) {
                return res.status(400).send({
                    id: req.params.id,
                    message: 'order not found'
                });
            }

            if (order.customerId !== req.userId) {
                return res.status(401).send({
                    id: req.params.id,
                    message: 'Didnt have access'
                });
            }

            await order.destroy();

            res.status(200).send({
                orderId: req.params.id,
                message: 'Order successfully deleted'
            });
        } catch (error) {
            res.status(500).send({
                id: req.body.id,
                message: 'Error',
                errors: error
            });
        }
    }
};
