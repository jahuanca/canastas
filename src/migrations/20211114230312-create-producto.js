'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Producto', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: { type: Sequelize.STRING(200), allowNull: true, validate: { notEmpty: true, len: [1, 200] } },
      unidad: { type: Sequelize.STRING(200), allowNull: true, validate: { notEmpty: true, len: [1, 200] } },
      fechamod: { type: Sequelize.DATE, allowNull: false, defaultValue: Date.now },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Producto');
  }
};