const jwt = require('jsonwebtoken');

module.exports = {
    async verify(req, res, next) {
        let tokenHeader = req.headers['access-token'];

        if (!tokenHeader) {
            return res.status(403).send({
                auth: false,
                message: 'Error',
                errors: 'No token provided'
            });
        }

        let token = tokenHeader.split(' ')[1];

        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: 'Error',
                    errors: err
                });
            }
            req.userId = decoded.id;
            next();
        });
    }
};
