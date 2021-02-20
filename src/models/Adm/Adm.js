const { Model, DataTypes } = require('sequelize');

class Adm extends Model {
  static init(sequelize) {
    super.init({}, {sequelize});
  };

  static associate(models){
    this.hasMany(
      models.User,
      { foreignKey: 'tenant_id', as: 'users'}
    );
  };
  static associate(models){
    this.hasMany(
      models.Company,
      { foreignKey: 'tenant_id', as: 'companies'}
    );
  };
};

module.exports = Adm;