const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

routes.post('/sign-in', authController.signIn);
routes.post('/fogot-password', authController.fogotPassword);
routes.post('/reset-password', authController.resetPassword);

routes.use(authMiddleware);
routes.post('/sign-up', userController.signUp);
routes.get('/logout', authController.logout);
routes.patch('/user/:user_id', userController.updateUser);

module.exports = routes;