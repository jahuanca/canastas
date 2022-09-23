'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    let opciones=[
      'Muy malo',
      'Malo',
      'Regular',
      'Bueno',
      'Muy bueno',
    ];


    for (let index = 0; index < (opciones.length * 3 * 3); index++) {
      elementos.push(
        {
          idpregunta: parseInt((index / opciones.length) + 1),
          idusuario: 1,
          opcion: opciones[index % opciones.length],
          descripcion:  chance.sentence({words: 8}),
          observacion: chance.sentence({words: 8}),
        }
      )
    }
    return models.Opcion.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Opcion', null, {});
  }
};
