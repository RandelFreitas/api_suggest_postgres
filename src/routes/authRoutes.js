const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authControllers/authController');

routes.post('/sign-in', authController.signIn);
routes.post('/fogot-password', authController.fogotPassword);
routes.post('/reset-password', authController.resetPassword);
routes.get('/logout', authController.logout);

module.exports = routes;