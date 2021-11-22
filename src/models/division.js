'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Division extends Model {
    static associate(models) {
      
    }
  };
  Division.init({
    //add new parameters
    iddivision: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false},
    detalledivision: {type: DataTypes.STRING, allowNull: false},
    idsociedad: {type: DataTypes.INTEGER, allowNull: false},
    division: {type: DataTypes.STRING, allowNull: false},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Division',
    freezeTableName: true,
    timestamps: false,
    tableName: 'Division'
  });
  return Division;
};