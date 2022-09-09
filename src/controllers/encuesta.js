'use strict'
const models = require('../models')

async function getEncuestasCount(req, res) {
  let [err, encuestas] = await get(models.Encuesta.count({
    where: { estado: 'A' },
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (encuestas == null) return res.status(404).json({ message: `Encuestas nulos` })
  res.status(200).json(encuestas)
}

async function getEncuestasByLimitAndOffset(req, res) {
  let [err, encuestas] = await get(models.Encuesta.findAll({
    where: { estado: 'A' },
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (encuestas == null) return res.status(404).json({ message: `Encuestas nulos` })
  res.status(200).json(encuestas)
}

async function getEncuestas(req, res) {
  let [err, encuestas] = await get(models.Encuesta.findAll({
    where: { estado: 'A' },
    /* include: [{ all: true }] */
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (encuestas == null) return res.status(404).json({ message: `Encuestas nulos` })
  res.status(200).json(encuestas)
}

async function getEncuesta(req, res) {
  let [err, encuesta] = await get(models.Encuesta.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: `${err}` })
  if (encuesta == null) return res.status(404).json({ message: `Encuestas nulos` })
  res.status(200).json(encuesta)
}

async function createEncuesta(req, res) {

  let [err, encuesta] = await get(models.Encuesta.create({
    idusuario: 1,
    idtipoencuesta: 1,
    periodo: req.body.periodo,
    fechaInicio: req.body.fechaInicio,
    fechaFin: req.body.fechaFin,
    anio: req.body.anio,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    observacion: req.body.observacion,

    accion: 'I',
    accion_usuario: 'Creo un nuevo encuesta.',
    ip: req.ip,
    usuario: 0
  }))
  console.log(err);
  if (err) return res.status(500).json({ message: `${err}` })
  if (encuesta == null) return res.status(404).json({ message: `Encuestas nulos` })
  res.status(200).json(encuesta)
}


async function updateEncuesta(req, res) {
  let [err, encuesta] = await get(models.Encuesta.update({
    //all fields to update

    accion: 'U',
    accion_usuario: 'Edito un encuesta.',
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
  if (encuesta == null) return res.status(404).json({ message: `Encuestas nulos` })
  res.status(200).json(encuesta[1][0].dataValues)
}


async function deleteEncuesta(req, res) {
  let [err, encuesta] = await get(models.Encuesta.update({
    estado: 'I',

    accion_usuario: 'Elimino un encuesta.',
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
  if (encuesta == null) return res.status(404).json({ message: `Encuestas nulos` })
  res.status(200).json(encuesta[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
    return [null, data];
  })
    .catch(err => [err]);
}

module.exports = {
  getEncuestasCount,
  getEncuestasByLimitAndOffset,
  getEncuestas,
  getEncuesta,
  createEncuesta,
  updateEncuesta,
  deleteEncuesta
}