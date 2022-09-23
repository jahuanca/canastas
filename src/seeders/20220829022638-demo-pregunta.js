'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    let preguntas=[
      '¿LOGRO CONCLUIR SU TRABAJO?',
      '¿Recomendaria nuestro servicio?',
      '¿Tuvo algun accidente en la semana?',

      '¿CUMPLIO TODAS LAS METAS PROPUESTAS?',
      '¿Volveria a solicitar nuestro catalogo?',
      '¿La cantidad marcada fue la que llego al almacen?',

      '¿Necesito de horas extras para cumplir sus actividades?',
      '¿La atencion fue la adecuada?',
      '¿Tuvo que reponer de algun almacen?',
    ];

    for (let index = 0; index < preguntas.length; index++) {
      elementos.push(
        {
          idencuesta: (index % 3) + 1,
          idusuario: 1,
          idtipopregunta: 1,
          pregunta: preguntas[index],
          descripcion:  chance.sentence({words: 8}),
          observacion: chance.sentence({words: 8}),
          permitirOpcionManual: ((index + 1) % 3 == 0 ? true : false),
        }
      )
    }
    return models.Pregunta.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pregunta', null, {});
  }
};
