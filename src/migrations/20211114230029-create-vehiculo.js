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
      placa: { type: Sequelize.STRING, allowNull: true, validate: { notEmpty: true, len: [1, 200] } },
      modelo: { type: Sequelize.STRING, allowNull: true, validate: { notEmpty: true, len: [1, 200] } },
      fechamod: { type: Sequelize.DATE, allowNull: false, defaultValue: Date.now },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Vehiculo');
  }
};