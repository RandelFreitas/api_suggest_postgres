const { Model, DataTypes } = require('sequelize');

class Address extends Model {
  static init(sequelize) {
    super.init({
      zipcode: DataTypes.STRING,
      street: DataTypes.STRING,
      number: DataTypes.INTEGER,
      district: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      type: DataTypes.STRING,
      obs: DataTypes.STRING,
    }, { sequelize });
  };

  static associate(models) {
    this.hasMany(
      models.User, 
      { foreignKey: 'address_id', as: 'users' }
    );
  };
};

module.exports = Address;