const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');
const Company = require('../models/Company');

const connection = new Sequelize(dbConfig);
User.init(connection);
Company.init(connection);

module.exports = connection;