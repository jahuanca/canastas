'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Punto_Entrega', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
        validate: { notEmpty: true, len: [1, 1], isIn: [['A', 'I']], isAlpha: true }
      },

      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Date.now },
      updatedAt: { type: Sequelize.DATE, allowNull: true },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Punto_Entrega');
  }
};