'use strict'
const models = require('../models')

async function getTemporadasCount(req, res) {
  let [err, temporadas] = await get(models.Temporada.count({
    where: { estado: 'A' },
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (temporadas == null) return res.status(404).json({ message: `Temporadas nulos` })
  res.status(200).json(temporadas)
}

async function getTemporadasByLimitAndOffset(req, res) {
  let [err, temporadas] = await get(models.Temporada.findAll({
    where: { estado: 'A' },
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (temporadas == null) return res.status(404).json({ message: `Temporadas nulos` })
  res.status(200).json(temporadas)
}

async function getTemporadas(req, res) {
  let [err, temporadas] = await get(models.Temporada.findAll({
    where:{estado: 'A'},
    include: [{ all: true }]
  }))
  console.log(err);
  if (err) return res.status(500).json({ message: `${err}` })
  if (temporadas == null) return res.status(404).json({ message: `Temporadas nulos` })
  res.status(200).json(temporadas)
}

async function getTemporada(req, res) {
  let [err, temporada] = await get(models.Temporada.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: `${err}` })
  if (temporada == null) return res.status(404).json({ message: `Temporadas nulos` })
  res.status(200).json(temporada)
}

async function createTemporada(req, res) {
  console.log(req.body);
  let [err, temporada] = await get(models.Temporada.create({
    anio: req.body.anio,
    periodo: req.body.periodo,
    descripcion: req.body.descripcion,
    idproducto: req.body.idproducto,
    fechainicio: req.body.fechainicio,
    fechafin: req.body.fechafin,

    accion: 'I',
    accion_usuario: 'Creo un nuevo temporada.',
    ip: req.ip,
    usuario: 0
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (temporada == null) return res.status(404).json({ message: `Temporadas nulos` })
  res.status(200).json(temporada)
}


async function updateTemporada(req, res) {
  let [err, temporada] = await get(models.Temporada.update({
    anio: req.body.anio,
    periodo: req.body.periodo,
    descripcion: req.body.descripcion,
    idproducto: req.body.idproducto,

    accion: 'U',
    accion_usuario: 'Edito un temporada.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.body.id,/*  estado:'A' */
    },
    individualHooks: true,
    validate: false
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (temporada == null) return res.status(404).json({ message: `Temporadas nulos` })
  res.status(200).json(temporada[1][0].dataValues)
}


async function deleteTemporada(req, res) {
  let [err, temporada] = await get(models.Temporada.update({
    estado: 'I',

    accion_usuario: 'Elimino un temporada.',
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
  if (temporada == null) return res.status(404).json({ message: `Temporadas nulos` })
  res.status(200).json(temporada[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
    return [null, data];
  })
    .catch(err => [err]);
}

module.exports = {
  getTemporadasCount,
  getTemporadasByLimitAndOffset,
  getTemporadas,
  getTemporada,
  createTemporada,
  updateTemporada,
  deleteTemporada
}