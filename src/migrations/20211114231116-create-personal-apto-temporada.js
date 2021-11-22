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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PersonalAptoTemporada');
  }
};