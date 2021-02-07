const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

routes.post('/sign-in', authController.signIn);
routes.post('/sign-up', authController.signUp);
routes.post('/fogot-password', authController.fogotPassword);
routes.post('/reset-password', authController.resetPassword);

routes.post('/teste', authController.teste);

routes.use(authMiddleware);
routes.get('/logout', authController.logout);
routes.patch('/login', authController.update);

module.exports = routes;