const route = require('express').Router();
const authController = require('../controllers/auth.controller');

// SIGNUP
route.post('/signup', authController.signUp);

// SIGNIN
route.post('/signin', authController.signIn);

module.exports = route;
