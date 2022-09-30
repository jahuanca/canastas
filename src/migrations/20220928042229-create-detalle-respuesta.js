'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Detalle_Respuesta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idrespuesta: {type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: 'Respuesta',
          key: 'id'
        }
      },
      idusuario: {type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: { tableName: 'Usuarios', schema: 'dbo' },
          key: 'idusuario',
        }
      },
      idopcion: {type: Sequelize.INTEGER, allowNull: true,
        references: {
          model: 'Opcion',
          key: 'id'
        }
      },
      opcionmanual: {type: Sequelize.STRING(200), allowNull: true,},
      fecha: { type: Sequelize.DATEONLY, allowNull: false,},
      hora: { type: Sequelize.DATE, allowNull: false,},
      descripcion: {type: Sequelize.STRING(200), allowNull: true,},
      observacion: {type: Sequelize.STRING(200), allowNull: true,},
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
    return queryInterface.dropTable('Detalle_Respuesta');
  }
};