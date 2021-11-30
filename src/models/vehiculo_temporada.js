'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehiculo_Temporada extends Model {
    static associate(models) {
      Vehiculo_Temporada.belongsTo(models.Vehiculo, {foreignKey: 'idvehiculo',});
      Vehiculo_Temporada.belongsTo(models.Temporada, {foreignKey: 'idtemporada',});
    }
  };
  Vehiculo_Temporada.init({
    //add new parameters
    idtemporada: {type: DataTypes.INTEGER, allowNull: true,},
    idvehiculo: {type: DataTypes.INTEGER, allowNull: true,},
    idusuario: {type: DataTypes.INTEGER, allowNull: true,},
    placa: {type: DataTypes.STRING, allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    fecha: {type: DataTypes.DATEONLY, allowNull: false, defaultValue: Date.now},
    hora: {type: DataTypes.TIME, allowNull: false, defaultValue: Date.now},

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
    modelName: 'Vehiculo_Temporada',
    freezeTableName: true,
    tableName: 'VehiculoTemporada'
  });
  return Vehiculo_Temporada;
};