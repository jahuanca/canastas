'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pregunta extends Model {
    static associate(models) {
      
    }
  };
  Pregunta.init({
    //add new parameters
    idusuario: {type: DataTypes.INTEGER, allowNull: false},
    idencuesta: {type: DataTypes.INTEGER, allowNull: false},
    idtipopregunta: {type: DataTypes.INTEGER, allowNull: false},
    pregunta: {type: DataTypes.STRING(100), allowNull: true, validate: {notEmpty: true, len: [1,100]}},

    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    observacion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    estado: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },
    permitirOpcionManual: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},

    createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: DataTypes.DATE, allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    sequelize,
    modelName: 'Pregunta',
    freezeTableName: true,
    tableName: 'Pregunta'
  });

  Pregunta.associate = function(models) {
    Pregunta.hasMany(models.Opcion, {foreignKey: "idpregunta",targetKey: 'idpregunta'})
    Pregunta.belongsTo(models.Encuesta, {foreignKey: "id"})
  };
  
  return Pregunta;
};