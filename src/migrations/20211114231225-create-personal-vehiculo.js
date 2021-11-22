'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PersonalVehiculo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idpuntoentrega: {
        type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: 'Punto_Entrega',
          key: 'id'
        }
      },
      idvehiculotemporada: {
        type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: 'VehiculoTemporada',
          key: 'id'
        }
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
          model: 'Personal_Empresa',
          key: 'codigoempresa'
        } */
      },

      fecha: { type: Sequelize.DATEONLY, allowNull: false, },
      hora: { type: Sequelize.TIME, allowNull: false, },
      apto: { type: Sequelize.BOOLEAN, allowNull: false, },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PersonalVehiculo');
  }
};