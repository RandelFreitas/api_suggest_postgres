const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');
const Company = require('../models/Company');
const Adm = require('../models/Adm');

const connection = new Sequelize(dbConfig);

Adm.init(connection);
User.init(connection);
Company.init(connection);

Adm.associate(connection.models);
User.associate(connection.models);
Company.associate(connection.models);

module.exports = connection;