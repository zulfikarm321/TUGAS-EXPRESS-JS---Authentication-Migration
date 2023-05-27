const verifySignUpController = require('../controllers').verifySignUp;
const verifySignController = require('../controllers').verifySign;
const bookingController = require('../controllers').booking;
const verifyJwtTokenController = require('../controllers').verifyJwtToken;

module.exports = function (app) {
    //User Auth
    app.get('/', (req, res) => {
        res.send('Heloo');
    });

    app.post(
        '/api/auth/signup',
        [verifySignUpController.checkDuplicateUserNameOrEmail],
        verifySignController.signup
    );

    app.post('/api/auth/signin', verifySignController.signin);

    // Booking
    app.get('/api/booking', bookingController.list);
    app.get(
        '/api/userbooking',
        [verifyJwtTokenController.verifyToken],
        bookingController.listUserBooking
    );
    app.get('/api/booking/:id', bookingController.getById);
    app.post(
        '/api/booking',
        [verifyJwtTokenController.verifyToken],
        bookingController.booking
    );
    app.put(
        '/api/booking/:id',
        [verifyJwtTokenController.verifyToken],
        bookingController.update
    );
    app.delete(
        '/api/booking/:id',
        [verifyJwtTokenController.verifyToken],
        bookingController.delete
    );
};
