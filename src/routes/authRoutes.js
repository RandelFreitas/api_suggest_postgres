const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const addressController = require('../controllers/addressController');

routes.post('/sign-in', authController.signIn);
routes.post('/fogot-password', authController.fogotPassword);
routes.post('/reset-password', authController.resetPassword);

routes.post('/sign-up', authController.signUp);
routes.get('/logout', authController.logout);


routes.use(authMiddleware);
routes.get('/teste', addressController.getTeste);

module.exports = routes;