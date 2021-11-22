'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario_Perfil extends Model {
    static associate(models) {
      
    }
  };
  Usuario_Perfil.init({
    //add new parameters

    idusuario:{type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    idPerfil:{type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    idsubdivision:{type: DataTypes.INTEGER, allowNull: false},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Usuario_Perfil',
    freezeTableName: true,
    timestamps: false,
    tableName: 'Usuario_Perfil'
  });
  return Usuario_Perfil;
};