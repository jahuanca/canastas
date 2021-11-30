'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personal_Apto_Temporada extends Model {
    static associate(models) {
      Personal_Apto_Temporada.belongsTo(models.Personal_Empresa, { foreignKey: "codigosap", targetKey: 'codigoempresa' });
    }
  };
  Personal_Apto_Temporada.init({
    //add new parameters
    idtemporada: { type: DataTypes.INTEGER, allowNull: true, },
    idusuario: { type: DataTypes.INTEGER, allowNull: true, },
    codigosap: { type: DataTypes.STRING, allowNull: true, },
    idestado: { type: DataTypes.INTEGER, allowNull: true, },
    estado: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },

    createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: new Date()},
    updatedAt: {type: DataTypes.DATE, allowNull: true}, 

    accion: { type: DataTypes.VIRTUAL },
    usuario: { type: DataTypes.VIRTUAL },
    ip: { type: DataTypes.VIRTUAL },
    accion_usuario: { type: DataTypes.VIRTUAL }
  }, {
    sequelize,
    modelName: 'Personal_Apto_Temporada',
    freezeTableName: true,
    tableName: 'PersonalAptoTemporada'
  });
  return Personal_Apto_Temporada;
};