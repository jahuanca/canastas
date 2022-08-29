'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    let opciones=[
      'POR DSO',
      'POR FALLECIMIENTO FAMILIAR',
      'POR COVID',
      'POR ENFERMEDAD',
      'POR MOVILIDAD',
      'SI',
      'NO',
      'BUEN TRATO',
      'MOVILIDAD PUNTUAL',
      'PAGO PUNTUAL',
      'BUENA COMIDA'
    ];

    let ids=[
      4,
      4,
      4,
      4,
      4,
      5,
      5,
      6,
      6,
      6,
      6
    ];
    for (let index = 0; index < opciones.length; index++) {
      elementos.push(
        {
          idencuesta: ids[index],
          opcion: opciones[index],
          idusuario: 1,
          descripcion:  chance.sentence({words: 5}),
          observacion: chance.sentence({words: 5})
        }
      )
    }
    return models.EncuestaOpciones.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EncuestaOpciones', null, {});
  }
};
