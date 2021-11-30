'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehiculo extends Model {
    static associate(models) {
      
    }
  };
  Vehiculo.init({
    //add new parameters
    placa: {type: DataTypes.STRING, unique: true, allowNull: false, validate: {notEmpty: true, len: [1,200]}},
    modelo: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true, len: [1,200]}},

    /* descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    observacion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},*/
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
    modelName: 'Vehiculo',
    freezeTableName: true,
    tableName: 'Vehiculo'
  });
  return Vehiculo;
};