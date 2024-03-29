'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let titulos=[
      'RENDIMIENTO MENSUAL',
      'SATIFACCIÓN DEL CLIENTE',
      'RIESGOS EN EL PROCESO',
    ];
    let elementos=[];
    for (let index = 0; index < titulos.length; index++) {
      elementos.push(
        {
          idusuario: 1,
          idtipoencuesta: 1,
          anio: '2022',
          periodo: 'Setiembre',
          fechaInicio: Date.now(),
          fechaFin: Date.now(),
          titulo: titulos[index],
          descripcion:  chance.sentence({words: 8}),
          observacion: chance.sentence({words: 8}),
        }
      )
    }
    return models.Encuesta.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Encuesta', null, {});
  }
};
