'use strict';
const models=require('../models')
const Chance=require('chance')
const config=require('../config')
const moment=require('moment')
const chance=new Chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    let elementos=[];

    let ids=[
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      3,
      3,
      3,
      3
    ];

    

    for (let index = 0; index < 0; index++) {

      let num=  chance.integer({ min: 0, max: ids.length });  

      elementos.push(
        {
          codigoempresa: PERSONAL_PRUEBA[index],
          idsubdivision: 1,
          idusuario: 1,
          idencuesta: num==0 ? ids[0] : ids[num-1], 
          idopcionencuesta: num==0 ? null : num,
          opcionmanual: num==0 ? 'Opcion manual: '+index : null,
          fecha: moment().add('d', num),
          hora: moment().add('d', num),
          descripcion:  chance.sentence({words: 7}),
          observacion: chance.sentence({words: 8})
        }
      )
    }
    return models.Encuesta_Detalle.bulkCreate(elementos, {
      individualHooks: true 
    }, {returning: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EncuestaDetalle', null, {});
  }
};


const PERSONAL_PRUEBA=[
10000001,
10000002,
10000003,
10000004,
10000005,
10000006,
10000007,
10000008,
10000009,
10000010,
10000011,
10000012,
10000013,
10000014,
10000015,
10000016,
10000017,
10000018,
10000019,
10000020,
10000021,
10000022,
10000023,
10000024,
10000025,
10000026,
10000027,
10000028,
10000029,
10000030,
10000031,
10000032,
10000033,
10000034,
10000035,
10000036,
10000037,
10000038,
10000039,
10000040,
10000041,
10000042,
10000043,
10000044,
10000045,
10000046,
10000047,
10000048,
10000049,
10000050,
10000051,
10000052,
10000053,
10000054,
10000055,
10000056,
10000057,
10000058,
10000059,
10000060,
10000061,
10000062,
10000063,
10000064,
10000065,
10000066,
10000067,
10000068,
10000069,
10000070,
10000071,
10000072,
10000073,
10000074,
10000075,
10000076,
10000077,
10000078,
10000079,
10000080,
10000081,
10000082,
10000083,
10000084,
10000085,
10000086,
10000087,
10000088,
10000089,
10000090,
10000091,
10000092,
10000093,
10000094,
10000095,
10000096,
10000097,
10000098,
10000099,
10000100,
];