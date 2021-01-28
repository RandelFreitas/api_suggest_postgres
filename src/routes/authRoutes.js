const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

routes.post('/sign-in', authController.signIn);
routes.post('/fogot-password', authController.fogotPassword);
routes.post('/reset-password', authController.resetPassword);

//routes.use(authMiddleware);
routes.post('/sign-up', authController.signUp);
routes.get('/logout', authController.logout);

module.exports = routes;