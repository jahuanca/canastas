'use strict'
const models = require('../models')

async function getPreguntasCount(req, res) {
  let [err, preguntas] = await get(models.Pregunta.count({
    where: { estado: 'A' },
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (preguntas == null) return res.status(404).json({ message: `Preguntas nulos` })
  res.status(200).json(preguntas)
}

async function getPreguntasByLimitAndOffset(req, res) {
  let [err, preguntas] = await get(models.Pregunta.findAll({
    where: { estado: 'A' },
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (preguntas == null) return res.status(404).json({ message: `Preguntas nulos` })
  res.status(200).json(preguntas)
}

async function getPreguntas(req, res) {
  let [err, preguntas] = await get(models.Pregunta.findAll({
    where: { estado: 'A' },
    include: [{ all: true }]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (preguntas == null) return res.status(404).json({ message: `Preguntas nulos` })
  res.status(200).json(preguntas)
}

async function getPreguntasByIdEncuesta(req, res) {
  let [err, preguntas] = await get(models.Pregunta.findAll({
    where: { estado: 'A', idencuesta: req.params.id },
    include: [{
      model: models.Opcion, required: false ,where: {estado: 'A'}
    }]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (preguntas == null) return res.status(404).json({ message: `Preguntas nulos` })
  res.status(200).json(preguntas)
}

async function getPregunta(req, res) {
  let [err, pregunta] = await get(models.Pregunta.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: `${err}` })
  if (pregunta == null) return res.status(404).json({ message: `Preguntas nulos` })
  res.status(200).json(pregunta)
}

async function createPregunta(req, res) {

  let [err, pregunta] = await get(models.Pregunta.create({
    pregunta: req.body.pregunta,
    descripcion: req.body.descripcion,
    idtipopregunta: req.body.idtipopregunta,
    permitirOpcionManual: req.body.permitirOpcionManual,
    idencuesta: req.body.idencuesta,
    idusuario: 1,

    accion: 'I',
    accion_usuario: 'Creo un nuevo pregunta.',
    ip: req.ip,
    usuario: 0
  }))
  console.log(err);
  if (err) return res.status(500).json({ message: `${err}` })
  if (pregunta == null) return res.status(404).json({ message: `Preguntas nulos` })

  for (let i = 0; i < req.body.Opcions.length; i++) {
    const element = req.body.Opcions[i];
    let [errOpcion, opcion] = await get(models.Opcion.create({
      idpregunta: pregunta.id,
      opcion: element.opcion,
      idusuario: 1,

      accion: 'I',
      accion_usuario: 'Creo una nueva opción.',
      ip: req.ip,
      usuario: 0
    }))

    if (errOpcion) return res.status(500).json({ message: `${errOpcion}` })
    req.body.Opcions[i]= opcion.dataValues;
  }
  pregunta.Opcions=req.body.Opcions;
  res.status(200).json(pregunta)
}


async function updatePregunta(req, res) {
  let [err, pregunta] = await get(models.Pregunta.update({
    pregunta: req.body.pregunta,
    descripcion: req.body.descripcion,
    idtipopregunta: req.body.idtipopregunta,
    permitirOpcionManual: req.body.permitirOpcionManual,
    idencuesta: req.body.idencuesta,

    accion: 'U',
    accion_usuario: 'Edito un pregunta.',
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
  if (pregunta == null) return res.status(404).json({ message: `Preguntas nulos` })
  res.status(200).json(pregunta[1][0].dataValues)
}


async function deletePregunta(req, res) {
  let [err, pregunta] = await get(models.Pregunta.update({
    estado: 'I',

    accion_usuario: 'Elimino un pregunta.',
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
  if (pregunta == null) return res.status(404).json({ message: `Preguntas nulos` })
  res.status(200).json(pregunta[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
    return [null, data];
  })
    .catch(err => [err]);
}

module.exports = {
  getPreguntasCount,
  getPreguntasByIdEncuesta,
  getPreguntasByLimitAndOffset,
  getPreguntas,
  getPregunta,
  createPregunta,
  updatePregunta,
  deletePregunta
}