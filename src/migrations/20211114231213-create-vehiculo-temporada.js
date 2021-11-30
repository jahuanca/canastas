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
      estado: {
        type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
        validate: { notEmpty: true, len: [1, 1], isIn: [['A', 'I']], isAlpha: true }
      },

      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Date.now },
      updatedAt: { type: Sequelize.DATE, allowNull: true },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('VehiculoTemporada');
  }
};