'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('superagent');
module.exports = (sequelize, DataTypes) => {
  class Encuesta_Detalle extends Model {
    static associate(models) {

    }
  };
  Encuesta_Detalle.init({
    //add new parameters
    idsubdivision: { type: DataTypes.INTEGER, allowNull: false },
    idusuario: { type: DataTypes.INTEGER, allowNull: false },
    idencuesta: { type: DataTypes.INTEGER, allowNull: false },
    idopcionencuesta: { type: DataTypes.INTEGER, allowNull: true },
    codigoempresa: { type: DataTypes.STRING(8), primaryKey: true, allowNull: true, validate: { notEmpty: true, len: [1, 8] } },
    opcionmanual: { type: DataTypes.STRING(200), allowNull: true, validate: { notEmpty: true, len: [1, 200] } },
    fecha: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: Date.now },
    hora: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now },

    descripcion: { type: DataTypes.STRING(200), allowNull: true, validate: { notEmpty: true, len: [1, 200] } },
    observacion: { type: DataTypes.STRING(200), allowNull: true, validate: { notEmpty: true, len: [1, 200] } },
    estado: {
      type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: { notEmpty: true, len: [1, 1], isIn: [['A', 'I']], isAlpha: true }
    },

    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now },
    updatedAt: { type: DataTypes.DATE, allowNull: true },

    accion: { type: DataTypes.VIRTUAL },
    usuario: { type: DataTypes.VIRTUAL },
    ip: { type: DataTypes.VIRTUAL },
    accion_usuario: { type: DataTypes.VIRTUAL }
  },
    {
      validate: {
        isUnique: function (done) {
          //cuando se va modificar y crear id_cartera!=undefined
          sequelize.models.Encuesta_Detalle.count({
            where:
            {
              estado: 'A',
              codigoempresa: this.codigoempresa,
              idencuesta: this.idencuesta,
              fecha: this.fecha,

            }
          })
            .done(function (encuesta, err) {
              if (err) {
                done(err);
              }
              if (encuesta > 0) {
                done(new Error('Ya se una encuesta con estos datos.'));
              }
              done();
            });
        }
      },
      sequelize,
      modelName: 'Encuesta_Detalle',
      freezeTableName: true,
      tableName: 'EncuestaDetalle'
    });

    Encuesta_Detalle.associate = function(models) {
      Encuesta_Detalle.belongsTo(models.Personal_Empresa, {foreignKey: "codigoempresa",targetKey: 'codigoempresa'});
      Encuesta_Detalle.belongsTo(models.EncuestaOpcion, {foreignKey: "idopcionencuesta",})
      /* Personal_Empresa.belongsTo(models.PersonalEmpresa_Subdivision, {foreignKey: "codigoempresa",targetKey: 'codigoempresa'}) */
    };

  return Encuesta_Detalle;
};