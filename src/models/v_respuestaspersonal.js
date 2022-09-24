'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RespuestasPersonal extends Model {
    static associate(models) {
      
    }
  };
  RespuestasPersonal.init({
    //add new parameters
    //id: {type: DataTypes.INTEGER, allowNull: false},
    idrespuesta: {primaryKey: true,type: DataTypes.INTEGER, allowNull: false},
    subdivision: {type: DataTypes.STRING(10), allowNull: false, validate: {notEmpty: true, len: [1,200]}},
    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,100]}},
    anio: {type: DataTypes.STRING(10), allowNull: true, validate: {notEmpty: true, len: [1,100]}},
    periodo: {type: DataTypes.STRING(10), allowNull: true, validate: {notEmpty: true, len: [1,100]}},
    titulo: {type: DataTypes.STRING(200), allowNull: false, validate: {notEmpty: true, len: [1,200]}},
    pregunta: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    opcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    opcionmanual: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    nombrecompleto: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    nrodocumento: {type: DataTypes.STRING(10), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    fecha: {type: DataTypes.DATE, allowNull: false},
    hora: {type: DataTypes.DATE, allowNull: false},
    unidadnegocio: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    etapa: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    campo: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    turno: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    id: { type: DataTypes.INTEGER, allowNull: true, },
    idsubdivision: { type: DataTypes.INTEGER, allowNull: true, },

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
    modelName: 'v_respuestaspersonal',
    freezeTableName: true,
    tableName: 'v_respuestaspersonal'
  });

  return RespuestasPersonal;
};