'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Encuesta extends Model {
    static associate(models) {
      
    }
  };
  Encuesta.init({
    //add new parameters
    idusuario: {type: DataTypes.INTEGER, allowNull: false},
    idtipoencuesta: {type: DataTypes.INTEGER, allowNull: false},
    periodo: {type: DataTypes.STRING(100), allowNull: true, validate: {notEmpty: true, len: [1,100]}},
    fechaInicio: {type: DataTypes.DATE, allowNull: false},
    fechaFin: {type: DataTypes.DATE, allowNull: false},
    titulo: {type: DataTypes.STRING(100), allowNull: true, validate: {notEmpty: true, len: [1,100]}},

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
    modelName: 'Encuesta',
    freezeTableName: true,
    tableName: 'Encuesta'
  });
  return Encuesta;
};