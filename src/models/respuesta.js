'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Respuesta extends Model {
    static associate(models) {
      
    }
  };
  Respuesta.init({
    //add new parameters
    idsubdivision: { type: DataTypes.INTEGER, allowNull: false },
    idusuario: { type: DataTypes.INTEGER, allowNull: false },
    idpregunta: { type: DataTypes.INTEGER, allowNull: false },
    idunidad: { type: DataTypes.INTEGER, allowNull: true },
    idetapa: { type: DataTypes.INTEGER, allowNull: true },
    idcampo: { type: DataTypes.INTEGER, allowNull: true },
    idturno: { type: DataTypes.INTEGER, allowNull: true },
    codigoempresa: { type: DataTypes.STRING(8), primaryKey: true, allowNull: true, validate: { notEmpty: true, len: [1, 8] } },
    fecha: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: Date.now },
    hora: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now },

    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    observacion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    estado: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },

    createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: DataTypes.DATE, allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    validate: {
      isUnique: function (done) {
        //cuando se va modificar y crear id_cartera!=undefined
        sequelize.models.Respuesta.count({
          where:
          {
            estado: 'A',
            codigoempresa: this.codigoempresa,
            idpregunta: this.idpregunta,
            fecha: this.fecha,
          }
        })
          .done(function (encuesta, err) {
            if (err) {
              done(err);
            }
            if (encuesta > 0) {
              done(new Error('Ya hay una respuesta con estos datos.'));
            }
            done();
          });
      }
    },
    sequelize,
    modelName: 'Respuesta',
    freezeTableName: true,
    tableName: 'Respuesta'
  });

  Respuesta.associate = function(models) {
    Respuesta.belongsTo(models.Pregunta, {foreignKey: "idpregunta"})
  };

  return Respuesta;
};