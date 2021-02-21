const express = require('express');
const routes = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const companyController = require('../controllers/companyController');
const userController = require('../controllers/userController');

routes.use(authMiddleware);
routes.get('/companies', companyController.getAllCompanies);
routes.get('/company/:id', companyController.getByIdCompany);
routes.post('/company', companyController.addCompany);
routes.patch('/company/:id', companyController.updateCompany);
routes.delete('/company/:id', companyController.deleteCompany);
routes.post('/company-address', companyController.addCompanyAddress);

routes.get('/users', userController.getAllUsers);
routes.get('/user/:id', userController.getUserById);

module.exports = routes;