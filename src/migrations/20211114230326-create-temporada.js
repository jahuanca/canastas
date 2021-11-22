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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Temporada');
  }
};