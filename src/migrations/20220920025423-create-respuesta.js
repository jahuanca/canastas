'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Respuesta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idsubdivision: {type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: { tableName: 'Subdivision', schema: 'dbo' },
          key: 'idsubdivision',
        }
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
      idpregunta: {type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: 'Pregunta',
          key: 'id'
        }
      },
      idopcion: {type: Sequelize.INTEGER, allowNull: true,
        references: {
          model: 'Opcion',
          key: 'id'
        }
      },
      codigoempresa: {type: Sequelize.STRING(8), primaryKey: true, allowNull: true, validate: {notEmpty: true, len: [1,8]}},
      opcionmanual: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
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
    return queryInterface.dropTable('Respuesta');
  }
};