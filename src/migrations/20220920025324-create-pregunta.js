'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pregunta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idusuario: {type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: { tableName: 'Usuarios', schema: 'dbo' },
          key: 'idusuario',
        }
      },
      idencuesta: {type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: 'Encuesta',
          key: 'id'
        }
      },
      idtipopregunta: {type: Sequelize.INTEGER, allowNull: false},
      pregunta: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,100]}},

      descripcion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      observacion: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
      estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A'},
      permitirOpcionManual: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true},
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
    return queryInterface.dropTable('Pregunta');
  }
};