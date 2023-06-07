const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = require('../models').User;
const Op = db.Sequelize.Op;
const config = require('../config/config');

module.exports = {
    async signup(req, res) {
        const user = await User.create({
            name: req.body.name,
            id: req.body.id,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });

        res.status(200).send({
            auth: true,
            id: req.body.id,
            message: 'User registered successfully!',
            errors: null
        });
    },

    async signin(req, res) {
        const user = await User.findOne({
            where: {
                id: req.body.id
            }
        });

        if (!user) {
            return res.status(404).send({
                auth: false,
                id: req.body.id,
                accessToken: null,
                message: 'Error',
                errors: 'User Not Found.'
            });
        }

        const passwordIsValid = await bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                auth: false,
                id: req.body.id,
                accessToken: null,
                message: 'Error',
                errors: 'Invalid Password!'
            });
        }

        const token =
            'Bearer ' +
            jwt.sign(
                {
                    id: user.id
                },
                config.secret,
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
    }
};
