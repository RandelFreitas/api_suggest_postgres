const express = require('express');
const routes = express.Router();
const companyController = require('../controllers/companyController');
const addressController = require('../controllers/addressController');

const authMiddleware = require('../middleware/authMiddleware');

routes.use(authMiddleware);
routes.get('/company', companyController.getAllCompanies);
routes.get('/company/:id', companyController.getByIdCompany);
routes.post('/company', companyController.addCompany);
routes.patch('/company/:id', companyController.updateCompany);
routes.delete('/company/:id', companyController.deleteCompany);

//routes.gett('/address', addressController.getByIdAddress);
routes.post('/address', addressController.postAddress);
//routes.patch('/address', addressController.updateAddress);

module.exports = routes;