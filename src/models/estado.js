'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estado extends Model {
    static associate(models) {
      
    }
  };
  Estado.init({
    idestado: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    detalle: {type: DataTypes.STRING, allowNull: false},
    estado: {type: DataTypes.STRING, allowNull: false},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Estado',
    timestamps:false,
    freezeTableName: true,
    tableName: 'Estado'
  });
  return Estado;
};