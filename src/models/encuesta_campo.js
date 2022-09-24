'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campo extends Model {
    static associate(models) {
      
    }
  };
  Campo.init({
    //add new parameters
   idcampo: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
   campo: {type: DataTypes.STRING(20), allowNull: true, validate: {notEmpty: true, len: [1,20]}},
   descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
   idetapa: {type: DataTypes.INTEGER, allowNull: false},
   
    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'encuesta_campo',
    freezeTableName: true,
    timestamps: false,
    tableName: 'encuesta_campo'
  });

  Campo.associate = function(models) {
    Campo.hasMany(models.encuesta_turno, {foreignKey: "idcampo",targetKey: 'idcampo'})
  };

  return Campo;
};