'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Etapa extends Model {
    static associate(models) {
      
    }
  };
  Etapa.init({
    //add new parameters

   
   idetapa: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
   etapa:{type: DataTypes.STRING(20), allowNull: true, validate: {notEmpty: true, len: [1,20]}},
   descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
   
    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'encuesta_etapa',
    freezeTableName: true,
    timestamps: false,
    tableName: 'encuesta_etapa'
  });

  Etapa.associate = function(models) {
    Etapa.hasMany(models.encuesta_campo, {foreignKey: "idetapa",targetKey: 'idetapa'})
  };



  return Etapa;
};