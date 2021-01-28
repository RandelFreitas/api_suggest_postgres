const express = require('express');
const routes = express.Router();
const clientController = require('../controllers/clientController');

//Companies routes
routes.get('/company-infos/:id', clientController.getCompanyInfos)
routes.get('/company-menu/:id', clientController.getMenu);
routes.post('/company-suggest/:id', clientController.addSuggest);
routes.post('/company-call/:id', clientController.addCall);

module.exports = routes;