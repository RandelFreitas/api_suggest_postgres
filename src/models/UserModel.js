const { Model, DataTypes } = require('sequelize');

class UserModel extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      cpf_cnpj: DataTypes.STRING,
      phone: DataTypes.STRING,
      n_companies: DataTypes.INTEGER,
      password_reset_token: DataTypes.STRING,
      password_reset_expires: DataTypes.STRING,
    }, { sequelize })
  }
}

module.exports = UserModel;