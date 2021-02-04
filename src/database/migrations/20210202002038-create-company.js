'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('companies', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING,
      },
      slogan: {
        type: Sequelize.STRING,
      },
      history: {
        type: Sequelize.STRING,
      },
      localization: {
        type: Sequelize.STRING,
      },
      stars: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      n_stars: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      total_stars: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      img_url: {
        type: Sequelize.STRING,
      },
      suggest: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      promo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      delivery: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      reservation: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      menu: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      call: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      zipcode: {type: Sequelize.STRING},
      street: {type: Sequelize.STRING},
      number: {type: Sequelize.INTEGER},
      district: {type: Sequelize.STRING},
      state: {type: Sequelize.STRING},
      city: {type: Sequelize.STRING},
      type: {type: Sequelize.STRING},
      obs: {type: Sequelize.STRING},
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('companies');
  }
};
