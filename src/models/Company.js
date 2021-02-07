const { Model, DataTypes } = require('sequelize');

class Company extends Model {
  static init(sequelize) {
    super.init({
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
    }, { sequelize });
  };

  static associate(models){
    this.belongsTo(
      models.Adm,
      { foreignKey: 'tenant_id', as: 'tenant'}
    );
  };
};

module.exports = Company;