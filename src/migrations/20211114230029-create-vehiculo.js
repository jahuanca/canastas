'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vehiculo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      placa: { type: Sequelize.STRING, unique: true, allowNull: true, validate: { notEmpty: true, len: [1, 200] } },
      modelo: { type: Sequelize.STRING, allowNull: true, validate: { notEmpty: true, len: [1, 200] } },
      estado: {
        type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
        validate: { notEmpty: true, len: [1, 1], isIn: [['A', 'I']], isAlpha: true }
      },

      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Date.now },
      updatedAt: { type: Sequelize.DATE, allowNull: true },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Vehiculo');
  }
};