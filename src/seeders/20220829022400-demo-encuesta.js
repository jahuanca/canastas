'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let titulos=[
      'FALTA LABORAL',
      'DESEA MOBILIDAD EN OLMOS',
      'NECESIDADES PARA LABORAR EN AGV',
    ];
    let elementos=[];
    for (let index = 0; index < 0; index++) {
      elementos.push(
        {
          periodo: '202201',
          fechaInicio: Date.now(),
          fechaFin: Date.now(),
          titulo: titulos[index],
          descripcion:  chance.sentence({words: 5}),
          observacion: chance.sentence({words: 5}),
          idusuario: 1,
          idtipoencuesta: 1,
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
