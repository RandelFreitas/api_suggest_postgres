const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      cpf_cnpj: DataTypes.STRING,
      phone: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      street: DataTypes.STRING,
      number: DataTypes.INTEGER,
      district: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      type: DataTypes.STRING,
      obs: DataTypes.STRING,
      password_reset_token: DataTypes.STRING,
      password_reset_expires: DataTypes.STRING,
    }, {sequelize});
  };
};

module.exports = User;