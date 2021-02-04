const express = require('express');
const routes = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const companyController = require('../controllers/companyController');

routes.use(authMiddleware);
routes.get('/company', companyController.getAllCompanies);
routes.get('/company/:id', companyController.getByIdCompany);
routes.post('/company', companyController.addCompany);
routes.patch('/company/:id', companyController.updateCompany);
routes.delete('/company/:id', companyController.deleteCompany);

module.exports = routes;