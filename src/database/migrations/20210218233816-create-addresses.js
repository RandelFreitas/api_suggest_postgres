'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: { model: 'addresses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      street: {
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      zipcode: {
        type: Sequelize.STRING,
      },
      obs: {
        type: Sequelize.STRING,
      },
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
    return queryInterface.dropTable('addresses');
  }
};
