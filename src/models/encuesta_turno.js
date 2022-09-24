'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turno extends Model {
    static associate(models) {
      
    }
  };
  Turno.init({
    //add new parameters
   idturno: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
   turno: {type: DataTypes.STRING(20), allowNull: true, validate: {notEmpty: true, len: [1,20]}},
   descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
   idcampo: {type: DataTypes.INTEGER, allowNull: false},
   idetapa: {type: DataTypes.INTEGER, allowNull: false},
   
    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'encuesta_turno',
    freezeTableName: true,
    timestamps: false,
    tableName: 'encuesta_turno'
  });

  
  return Turno;
};