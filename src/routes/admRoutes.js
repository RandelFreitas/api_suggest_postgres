const express = require('express');
const routes = express.Router();
const companyController = require('../controllers/companyController');
const addressController = require('../controllers/addressController');

const authMiddleware = require('../middleware/authMiddleware');

//Companies routes
routes.use(authMiddleware);
routes.get('/company', companyController.getAllCompanies);
routes.get('/company/:id', companyController.getById);
routes.post('/company', companyController.addCompany);
routes.patch('/company/:id', companyController.updateCompany);
routes.delete('/company/1', companyController.deleteCompany);

routes.post('/address/:user_id', addressController.postAddress);

module.exports = routes;