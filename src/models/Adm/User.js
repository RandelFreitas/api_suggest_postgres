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
      password_reset_token: DataTypes.STRING,
      password_reset_expires: DataTypes.DATE,
    }, {sequelize});
  };

  static associate(models){
    this.belongsTo(
      models.Adm,
      { foreignKey: 'tenant_id', as: 'tenant'}
    );
    this.hasOne(
      models.Address,
      { foreignKey: 'user_id', as: 'address'}
    );
  };

};

module.exports = User;