const Customer = require('../models').Customer;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async signUp(req, res) {
        try {
            const userId = await Customer.findOne({
                where: {
                    id: req.body.id
                }
            });

            if (userId) {
                return res.status(400).send({
                    message: 'Id already taken'
                });
            }

            const userEmail = await Customer.findOne({
                where: {
                    id: req.body.id
                }
            });

            if (userEmail) {
                return res.status(400).send({
                    message: 'Email already taken'
                });
            }

            await Customer.create({
                name: req.body.name,
                id: req.body.id,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8)
            });

            res.status(200).send({
                id: req.body.id,
                message: 'User registered successfully!',
                errors: null
            });
        } catch (error) {
            res.status(500).send({
                id: req.body.id,
                message: 'Error',
                errors: error
            });
        }
    },
    async signIn(req, res) {
        try {
            const customer = await Customer.findOne({
                where: {
                    id: req.body.id
                }
            });

            if (!customer) {
                return res.status(404).send({
                    auth: false,
                    id: req.body.id,
                    accessToken: null,
                    message: 'User Not Found.'
                });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                customer.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    auth: false,
                    id: req.body.id,
                    accessToken: null,
                    message: 'Invalid Password!'
                });
            }

            const token =
                'Bearer ' +
                jwt.sign(
                    {
                        id: customer.id
                    },
                    'secret',
                    {
                        expiresIn: 86400 //24h expired
                    }
                );

            res.status(200).send({
                auth: true,
                id: req.body.id,
                accessToken: token,
                message: 'Success',
                errors: null
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
