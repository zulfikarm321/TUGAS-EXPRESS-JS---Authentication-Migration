const { getById } = require('./status');

const Booking = require('../models').Booking;

module.exports = {
    async booking(req, res) {
        try {
            const book = await Booking.create({
                id_user: req.userId,
                id_tujuan: req.body.id_tujuan,
                id_jadwal: req.body.id_jadwal,
                id_kendaraan: req.body.id_kendaraan
            });

            res.status(200).send({
                auth: true,
                message: 'Booking successfully!',
                errors: null
            });
        } catch (error) {
            res.status(400).send({
                status_response: 'Bad Request',
                errors: error
            });
        }
    },

    async getById(req, res) {
        try {
            const bookingData = await Booking.findByPk(req.params.id, {});

            if (!bookingData) {
                return res.status(404).send({
                    status_response: 'Not Found',
                    errors: 'Data Not Found'
                });
            }

            const result = {
                status_response: 'OK',
                status: bookingData,
                errors: null
            };
            return res.status(200).send(result);
        } catch (error) {
            res.status(400).send({
                status_response: 'Bad Request',
                errors: error
            });
        }
    },

    async list(req, res) {
        try {
            const listData = await Booking.findAll({
                limit: 10,
                include: [],
                order: [['createdAt', 'DESC']]
            });

            const result = {
                status_response: 'OK',
                count: listData.length,
                statuses: listData.map((list) => {
                    return list;
                }),
                errors: null
            };
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({
                status_response: 'Bad Request',
                errors: error
            });
        }
    },

    async listUserBooking(req, res) {
        try {
            const listData = await Booking.findAll({
                limit: 10,
                include: [],
                where: {
                    id_user: req.userId
                },
                order: [['createdAt', 'DESC']]
            });

            const result = {
                status_response: 'OK',
                count: listData.length,
                statuses: listData.map((list) => {
                    return list;
                }),
                errors: null
            };
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({
                status_response: 'Bad Request',
                errors: error
            });
        }
    },

    async update(req, res) {
        try {
            const bookData = await Booking.findByPk(req.params.id, {});

            if (!bookData) {
                return res.status(404).send({
                    status_response: 'Bad Request',
                    errors: 'Data Not Found'
                });
            }

            if (bookData.id_user !== req.userId) {
                return res.status(403).send({
                    status_response: 'Bad Request',
                    errors: 'Different User Id'
                });
            }

            const result = await bookData.update({
                id_tujuan: req.body.id_tujuan || bookData.id_tujuan,
                id_jadwal: req.body.id_jadwal || bookData.id_jadwal,
                id_kendaraan: req.body.id_kendaraan || bookData.id_kendaraan
            });

            const status = {
                status_response: 'OK',
                status: result,
                errors: null
            };
            return res.status(200).send(status);
        } catch (error) {
            res.status(400).send({
                status_response: 'Bad Request',
                errors: error
            });
        }
    },

    async delete(req, res) {
        try {
            const bookingData = await Booking.findByPk(req.params.id);

            if (!bookingData) {
                return res.status(400).send({
                    status_response: 'Bad Request',
                    errors: 'Data Not Found'
                });
            }

            if (bookingData.id_user !== req.userId) {
                return res.status(403).send({
                    status_response: 'Bad Request',
                    errors: 'Different User Id'
                });
            }

            await bookingData.destroy();

            res.status(204).send({
                status_response: 'Success',
                errors: null
            });
        } catch (error) {
            res.status(400).send({
                status_response: 'Bad Request',
                errors: error
            });
        }
    }
};
