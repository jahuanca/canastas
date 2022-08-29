'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Encuesta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idusuario: { type: Sequelize.INTEGER, allowNull: true,
        references: {
          model: { tableName: 'Usuarios', schema: 'dbo' },
          key: 'idusuario',
        }
      },
      idtipoencuesta: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      periodo: {type: Sequelize.STRING(100), allowNull: true, validate: {notEmpty: true, len: [1,100]}},
      fechaInicio: {type: Sequelize.DATE, allowNull: false},
      fechaFin: {type: Sequelize.DATE, allowNull: false},
      titulo: {type: Sequelize.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
      descripcion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      observacion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A'},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Encuesta');
  }
};