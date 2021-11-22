'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subdivision extends Model {
    static associate(models) {
      
    }
  };
  Subdivision.init({
    //add new parameters

    idsubdivision: {type: DataTypes.INTEGER, primaryKey: true, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    detallesubdivision: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    iddivision: {type: DataTypes.INTEGER, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    subdivision: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Subdivision',
    freezeTableName: true,
    timestamps: false,
    tableName: 'Subdivision'
  });

  Subdivision.associate = function(models) {
    Subdivision.belongsTo(models.Division, {foreignKey: "iddivision",targetKey: 'iddivision'})
  };

  return Subdivision;
};