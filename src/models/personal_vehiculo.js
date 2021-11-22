'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personal_Vehiculo extends Model {
    static associate(models) {
      Personal_Vehiculo.belongsTo(models.Punto_Entrega, {foreignKey: 'idpuntoentrega'});
      Personal_Vehiculo.belongsTo(models.Personal_Empresa, {foreignKey: 'codigosap', targetKey: 'codigoempresa'});
      Personal_Vehiculo.belongsTo(models.Vehiculo_Temporada, {foreignKey: 'idvehiculotemporada',});
    }
  };
  Personal_Vehiculo.init({
    //add new parameters
    idpuntoentrega: {type: DataTypes.INTEGER, allowNull: true,},
    idvehiculotemporada: {type: DataTypes.INTEGER, allowNull: true,},
    idusuario: {type: DataTypes.INTEGER, allowNull: true,},
    codigosap: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},

    fecha: {type: DataTypes.DATEONLY, allowNull: false, defaultValue: Date.now},
    hora: {type: DataTypes.TIME, allowNull: false, defaultValue: Date.now},
    apto: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},


    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Personal_Vehiculo',
    freezeTableName: true,
    timestamps: false,
    tableName: 'PersonalVehiculo'
  });
  return Personal_Vehiculo;
};