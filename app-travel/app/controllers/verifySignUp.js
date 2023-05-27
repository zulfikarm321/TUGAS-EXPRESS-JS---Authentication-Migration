const User = require('../models').User;
const config = require('../config/config.js');
const ROLEs = config.ROLEs;

module.exports = {
    async checkDuplicateUserNameOrEmail(req, res, next) {
        const userId = await User.findOne({
            where: {
                id: req.body.id
            }
        });

        if (userId) {
            res.status(400).send({
                auth: false,
                id: req.body.id,
                message: 'Error',
                errors: 'Id is already taken!'
            });
            return;
        }

        const userEmail = await User.findOne({
            where: {
                id: req.body.email
            }
        });

        if (userEmail) {
            res.status(400).send({
                auth: false,
                id: req.body.id,
                message: 'Error',
                errors: 'Email is already taken!'
            });
            return;
        }
        next();
    }
};
