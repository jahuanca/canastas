'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detalle_Respuesta extends Model {
    static associate(models) {
      
    }
  };
  Detalle_Respuesta.init({
    //add new parameters
    idrespuesta: {type: DataTypes.INTEGER, allowNull: false},
    idusuario: {type: DataTypes.INTEGER, allowNull: false},
    idopcion: { type: DataTypes.INTEGER, allowNull: true },
    opcionmanual: { type: DataTypes.STRING(200), allowNull: true, validate: { notEmpty: true, len: [1, 200] } },
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
        sequelize.models.Detalle_Respuesta.count({
          where:
          {
            estado: 'A',
            idrespuesta: this.idrespuesta,
            idopcion: this.idopcion,
            fecha: this.fecha,

          }
        })
          .done(function (encuesta, err) {
            if (err) {
              done(err);
            }
            if (encuesta > 0) {
              done(new Error('Ya hay un detalle con estos datos.'));
            }
            done();
          });
      }
    },
    sequelize,
    modelName: 'Detalle_Respuesta',
    freezeTableName: true,
    tableName: 'Detalle_Respuesta'
  });
  return Detalle_Respuesta;
};