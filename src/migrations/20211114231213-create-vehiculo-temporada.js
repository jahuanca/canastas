'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('VehiculoTemporada', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idtemporada: { type: Sequelize.INTEGER, allowNull: true,
        references: {
          model: 'Temporada',
          key: 'id',
        }
      },
      idvehiculo: { type: Sequelize.INTEGER, allowNull: true,
        references: {
          model: 'Vehiculo',
          key: 'id',
        }
      },
      idusuario: { type: Sequelize.INTEGER, allowNull: true,
        references: {
          model: { tableName: 'Usuarios', schema: 'dbo' },
          key: 'idusuario',
        }
      },
      placa: { type: Sequelize.STRING, allowNull: true, validate: { notEmpty: true, len: [1, 200] } },
      fecha: { type: Sequelize.DATEONLY, allowNull: false, defaultValue: Date.now },
      hora: { type: Sequelize.TIME, allowNull: false, defaultValue: Date.now },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('VehiculoTemporada');
  }
};