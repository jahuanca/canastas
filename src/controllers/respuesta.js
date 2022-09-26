'use strict'
const { validate } = require('node-cron')
const models = require('../models')

async function getRespuestasCount(req, res) {
  let [err, respuestas] = await get(models.Respuesta.count({
    where: { estado: 'A' },
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (respuestas == null) return res.status(404).json({ message: `Respuestas nulos` })
  res.status(200).json(respuestas)
}

async function getRespuestasByLimitAndOffset(req, res) {
  let [err, respuestas] = await get(models.Respuesta.findAll({
    where: { estado: 'A' },
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (respuestas == null) return res.status(404).json({ message: `Respuestas nulos` })
  res.status(200).json(respuestas)
}

async function getRespuestas(req, res) {
  let [err, respuestas] = await get(models.Respuesta.findAll({
    where: { estado: 'A' },
    include: [{ all: true }]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (respuestas == null) return res.status(404).json({ message: `Respuestas nulos` })
  res.status(200).json(respuestas)
}

async function getRespuesta(req, res) {
  let [err, respuesta] = await get(models.Respuesta.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: `${err}` })
  if (respuesta == null) return res.status(404).json({ message: `Respuestas nulos` })
  res.status(200).json(respuesta)
}

async function createRespuesta(req, res) {
  let [err, respuesta] = await get(models.Respuesta.create({
    //all fields to insert

    accion: 'I',
    accion_usuario: 'Creo un nuevo respuesta.',
    ip: req.ip,
    usuario: 0
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (respuesta == null) return res.status(404).json({ message: `Respuestas nulos` })
  res.status(200).json(respuesta)
}

async function createAllRespuesta(req, res) {
  let personalEncuesta = req.body;
  let arreglo = req.body.respuestas;
  personalEncuesta.estadoLocal = 1;

  const t = await models.sequelize.transaction();

  for (let index = 0; index < arreglo.length; index++) {
    const element = arreglo[index];
    if (element.estado == null || element.estado == 'R' ) {
      let [err, respuesta] = await get(models.Respuesta.create({
        idsubdivision: 1,
        idusuario: 1,
        idpregunta: element.idpregunta,
        idopcion: element.idopcion,
        codigoempresa: element.codigoempresa,
        opcionmanual: element.opcionmanual,
        fecha: element.fecha,
        idunidad: element.idunidad,
        idencuesta: element.idencuesta,
        idcampo: element.idcampo,
        idetapa: element.idetapa,
        idturno: element.idturno,
        hora: element.hora,

        descripcion: element.descripcion,
        observacion: element.observacion,

        accion: 'I',
        accion_usuario: 'Creo un nuevo respuesta.',
        ip: req.ip,
        usuario: 0
      }), { validate: true, transaction: t });
      if (err) {
        if (err.errors != null) {
          for (let e = 0; e < err.errors.length; e++) {
            const eError = err.errors[e];
            if (eError) {
              if (eError.path == 'isUnique') {
                arreglo[index].estado = 'R';
                element.estado='R';
                personalEncuesta.estadoLocal = -1;
              }
              else {
                await t.rollback();
                console.log(err);
                return res.status(500).json({ message: `${err}` });
              }
            }
          }
        }
      }
      arreglo[index] = respuesta ?? element;
      
    } else {
      console.log('no inserto');
      arreglo[index]=element;
    }
  }
  await t.commit();
  personalEncuesta.respuestas = arreglo;
  res.status(200).json(personalEncuesta)
}


async function updateRespuesta(req, res) {
  let [err, respuesta] = await get(models.Respuesta.update({
    //all fields to update

    accion: 'U',
    accion_usuario: 'Edito un respuesta.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.body.id, estado: 'A'
    },
    individualHooks: true,
    validate: false
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (respuesta == null) return res.status(404).json({ message: `Respuestas nulos` })
  res.status(200).json(respuesta[1][0].dataValues)
}


async function deleteRespuesta(req, res) {
  let [err, respuesta] = await get(models.Respuesta.update({
    estado: 'I',

    accion_usuario: 'Elimino un respuesta.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.params.id, estado: 'A'
    },
    individualHooks: true
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (respuesta == null) return res.status(404).json({ message: `Respuestas nulos` })
  res.status(200).json(respuesta[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
    return [null, data];
  })
    .catch(err => [err]);
}

module.exports = {
  getRespuestasCount,
  getRespuestasByLimitAndOffset,
  getRespuestas,
  getRespuesta,
  createAllRespuesta,
  createRespuesta,
  updateRespuesta,
  deleteRespuesta
}