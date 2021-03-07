const express = require('express');
const routes = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const companyController = require('../controllers/admControllers/companyControllerAdm');
const userController = require('../controllers/admControllers/userControllerAdm');

routes.use(authMiddleware);
routes.get('/users', userController.getAllUsers);
routes.post('/sign-up', userController.signUp);
// routes.get('/companies', companyController.getAllCompanies);
// routes.get('/company/:id', companyController.getByIdCompany);
// routes.post('/company', companyController.addCompany);
// routes.patch('/company/:id', companyController.updateCompany);
// routes.delete('/company/:id', companyController.deleteCompany);
// routes.post('/company-address', companyController.addCompanyAddress);

module.exports = routes;