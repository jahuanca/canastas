'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnidadNegocio extends Model {
    static associate(models) {
      
    }
  };
  UnidadNegocio.init({
    //add new parameters
   idunidad: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
   descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
   grupo: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
   sociedad: {type: DataTypes.STRING(20), allowNull: true, validate: {notEmpty: true, len: [1,20]}},
   
   
    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'unidadnegocio',
    freezeTableName: true,
    timestamps: false,
    tableName: 'unidadnegocio'
  });

  
  return UnidadNegocio;
};