'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      
    }
  };
  Producto.init({
    //add new parameters
    descripcion: {type: DataTypes.STRING(200), allowNull: false, validate: {notEmpty: true, len: [1,200]}},
    unidad: {type: DataTypes.STRING(200), allowNull: false, validate: {notEmpty: true, len: [1,200]}},
    fechamod: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now},
    /* observacion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    estado: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    }, */

    /* createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: DataTypes.DATE, allowNull: true}, */

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Producto',
    timestamps: false,
    freezeTableName: true,
    tableName: 'Producto'
  });
  return Producto;
};