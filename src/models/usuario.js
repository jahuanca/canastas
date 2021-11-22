'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
        
    }
  };
  Usuario.init({
    //add new parameters
    idusuario: {primaryKey: true,type: DataTypes.INTEGER, allowNull: false},
    idtipodocumento: {type: DataTypes.INTEGER, allowNull: false},
    alias: {type: DataTypes.STRING(20), allowNull: false},
    password: {type: DataTypes.STRING(20), allowNull: false},
    apellidosnombres: {type: DataTypes.STRING(200), allowNull: false},
    nrodocumento: {type: DataTypes.STRING(200), allowNull: false},
    email: {type: DataTypes.STRING(200), allowNull: false},
    area: {type: DataTypes.STRING(50), allowNull: false},
    activo: {type: DataTypes.INTEGER, allowNull: false},
    fechamod: {type: DataTypes.DATE, allowNull: false},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Usuario',
    freezeTableName: true,
    tableName: 'Usuarios'
  });

  Usuario.associate = function(models) {
    //Usuario.belongsTo(models.Personal_Empresa_Subdivision, {foreignKey: "idusuario",targetKey: 'idusuario'})
    Usuario.hasMany(models.Usuario_Perfil, {foreignKey: "idusuario",targetKey: 'idusuario'})
  };

  return Usuario;
};