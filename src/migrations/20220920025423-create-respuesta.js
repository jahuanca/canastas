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
      idpregunta: {type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: 'Pregunta',
          key: 'id'
        }
      },
      idunidad: {type: Sequelize.INTEGER, allowNull: true,
        references: {
          model: 'unidadnegocio',
          key: 'idunidad'
        }
      },
      idetapa: {type: Sequelize.INTEGER, allowNull: true,
        references: {
          model: 'encuesta_etapa',
          key: 'idetapa'
        }
      },
      idcampo: {type: Sequelize.INTEGER, allowNull: true,
        references: {
          model: 'encuesta_campo',
          key: 'idcampo'
        }
      },
      idturno: {type: Sequelize.INTEGER, allowNull: true,
        references: {
          model: 'encuesta_turno',
          key: 'idturno'
        }
      },
      codigoempresa: {type: Sequelize.STRING(8), allowNull: true, validate: {notEmpty: true, len: [1,8]}},
      fecha: { type: Sequelize.DATEONLY, allowNull: false,},
      hora: { type: Sequelize.DATE, allowNull: false,},
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
    return queryInterface.dropTable('Respuesta');
  }
};