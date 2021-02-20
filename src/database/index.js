const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/Adm/User');
const Company = require('../models/Company/Company');
const Adm = require('../models/Adm/Adm');
const Address = require('../models/Shared/Address');

const connection = new Sequelize(dbConfig);

Adm.init(connection);
User.init(connection);
Address.init(connection);
Company.init(connection);

Adm.associate(connection.models);
Address.associate(connection.models);
User.associate(connection.models);
Company.associate(connection.models);

module.exports = connection;