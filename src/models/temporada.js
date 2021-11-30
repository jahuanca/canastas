'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Temporada extends Model {
    static associate(models) {
      Temporada.belongsTo(models.Producto, {foreignKey: "idproducto",});
      Temporada.hasMany(models.Personal_Apto_Temporada, {foreignKey: "idtemporada",});
      /* Temporada.hasMany(models.Vehiculo_Temporada, {foreignKey: "idtemporada",}); */
    }
  };
  Temporada.init({
    //add new parameters
    idproducto: {type: DataTypes.INTEGER, allowNull: false,},
    anio: {type: DataTypes.STRING(200), allowNull: false, validate: {notEmpty: true, len: [1,200]}},
    descripcion: {type: DataTypes.STRING(200), allowNull: false, validate: {notEmpty: true, len: [1,200]}},
    periodo: {type: DataTypes.STRING(200), allowNull: false, validate: {notEmpty: true, len: [1,200]}},
    fechainicio: {type: DataTypes.DATE, allowNull: false,},
    fechafin: {type: DataTypes.DATE, allowNull: false,},
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
    modelName: 'Temporada',
    freezeTableName: true,
    tableName: 'Temporada'
  });
  return Temporada;
};