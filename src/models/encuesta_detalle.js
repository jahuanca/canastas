'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Encuesta_Detalle extends Model {
    static associate(models) {
      
    }
  };
  Encuesta_Detalle.init({
    //add new parameters
    idsubdivision: {type: DataTypes.INTEGER, allowNull: false},
    idusuario: {type: DataTypes.INTEGER, allowNull: false},
    idencuesta: {type: DataTypes.INTEGER, allowNull: false},
    idopcionencuesta: {type: DataTypes.INTEGER, allowNull: false},
    codigoempresa: {type: DataTypes.STRING(8), primaryKey: true, allowNull: true, validate: {notEmpty: true, len: [1,8]}},
    opcionmanual: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    fecha: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now},
    hora: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now},

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
    sequelize,
    modelName: 'Encuesta_Detalle',
    freezeTableName: true,
    tableName: 'EncuestaDetalle'
  });
  return Encuesta_Detalle;
};