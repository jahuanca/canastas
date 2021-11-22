'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Punto_Entrega extends Model {
    static associate(models) {
      
    }
  };
  Punto_Entrega.init({
    //add new parameters


    nombre: {type: DataTypes.STRING(200), allowNull: false, validate: {notEmpty: true, len: [1,200]}},
    descripcion: {type: DataTypes.STRING(200), allowNull: false, validate: {notEmpty: true, len: [1,200]}},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Punto_Entrega',
    freezeTableName: true,
    tableName: 'Punto_Entrega'
  });
  return Punto_Entrega;
};