const { Model, DataTypes } = require('sequelize');

class Company extends Model {
  static init(sequelize) {
    super.init({
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      slogan: DataTypes.INTEGER,
      history: DataTypes.STRING,
      localization: DataTypes.STRING,
      stars: DataTypes.DOUBLE,
      n_stars: DataTypes.INTEGER,
      total_stars: DataTypes.INTEGER,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      img_url: DataTypes.STRING,
      suggest: DataTypes.BOOLEAN,
      promo: DataTypes.BOOLEAN,
      delivery: DataTypes.BOOLEAN,
      reservation: DataTypes.BOOLEAN,
      menu: DataTypes.BOOLEAN,
      call: DataTypes.BOOLEAN,
      zipcode: DataTypes.STRING,
      street: DataTypes.STRING,
      number: DataTypes.INTEGER,
      district: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      type: DataTypes.STRING,
      obs: DataTypes.STRING,
    }, { sequelize });
  }
}

module.exports = Company;