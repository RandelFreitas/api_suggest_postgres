const express = require('express');
const routes = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userControllers/userController');
const companyController = require('../controllers/userControllers/companyController');

routes.use(authMiddleware);
routes.get('/user/:id', userController.getUserById);
routes.patch('/user/:id', userController.updateUser);

routes.get('/companies', companyController.getAllCompanies);
routes.get('/company/:id', companyController.getByIdCompany);
routes.post('/company', companyController.addCompany);
routes.patch('/company/:id', companyController.updateCompany);

module.exports = routes;