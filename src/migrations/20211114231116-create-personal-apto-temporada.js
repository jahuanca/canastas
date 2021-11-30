'use strclsict';

const usuario = require("../models/usuario");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PersonalAptoTemporada', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idtemporada: {
        type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: 'Temporada',
          key: 'id',
        },
      },
      idusuario: {
        type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: { tableName: 'Usuarios', schema: 'dbo' },
          key: 'idusuario',
        }
      },
      codigosap: {
        type: Sequelize.STRING(8), allowNull: false,
        /* references: {
          //model: { tableName: 'PersonalEmpresa', schema: 'dbo' },
          model: 'Personal_Empresa',
          key: 'codigoempresa'
        } */
      },
      idestado: {
        type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: { tableName: 'Estados', schema: 'dbo' },
          //model: 'Estados',
          key: 'idestado',
        },
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
    return queryInterface.dropTable('PersonalAptoTemporada');
  }
};