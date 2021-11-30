'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Temporada', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idproducto: { type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: 'Producto',
          key: 'id',
        }
      },
      anio: { type: Sequelize.STRING(200), allowNull: true, validate: { notEmpty: true, len: [1, 200] } },
      descripcion: { type: Sequelize.STRING(200), allowNull: true, validate: { notEmpty: true, len: [1, 200] } },
      periodo: { type: Sequelize.STRING(200), allowNull: true, validate: { notEmpty: true, len: [1, 200] } },
      fechainicio: {type: Sequelize.DATE, allowNull: false,},
      fechafin: {type: Sequelize.DATE, allowNull: false,},
      estado: {
        type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
        validate: { notEmpty: true, len: [1, 1], isIn: [['A', 'I']], isAlpha: true }
      },

      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Date.now },
      updatedAt: { type: Sequelize.DATE, allowNull: true },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Temporada');
  }
};