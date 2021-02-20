const { Model, DataTypes } = require('sequelize');

class Address extends Model {
  static init(sequelize) {
    super.init({
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      street: DataTypes.STRING,
      number: DataTypes.STRING,
      type: DataTypes.STRING,
      district: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      obs: DataTypes.STRING,
    }, {sequelize});
  };

  static associate(models){
    this.belongsTo(
      models.User,
      {foreignKey: 'user_id', as: 'user'}
    );
  };
  static associate(models){
    this.belongsTo(
      models.Company,
      {foreignKey: 'company_id', as: 'company'}
    );
  };
};

module.exports = Address;