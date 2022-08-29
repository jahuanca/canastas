'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];
    for (let index = 0; index < 0; index++) {
      elementos.push(
        {
          descripcion:  chance.sentence({words: 5}),
          observacion: chance.sentence({words: 5})
        }
      )
    }
    return models.EncuestaDetalle.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EncuestaDetalle', null, {});
  }
};
