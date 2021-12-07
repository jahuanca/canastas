'use strict'
const models = require('../models')
const moment = require('moment')
const _ = require('lodash')

async function getPersonal_Vehiculos(req, res) {
  let [err, personal_vehiculos] = await get(models.Personal_Vehiculo.findAll({
    where: { estado: 'A' },
    include: [{ model: models.Vehiculo_Temporada }, { model: models.Personal_Empresa }]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (personal_vehiculos == null) return res.status(404).json({ message: `Personal_Vehiculos nulos` })
  res.status(200).json(personal_vehiculos)
}

async function getPersonal_VehiculosByTemporada(req, res) {
  let [err, personal_vehiculos] = await get(models.Personal_Vehiculo.findAll({
    attributes: [
      'codigosap',
      [models.Sequelize.col('Vehiculo_Temporada.idtemporada'), 'idtemporada'],
      [models.Sequelize.col('Personal_Empresa.codigoempresa'), 'codigoempresa'],
      [models.Sequelize.col('Personal_Empresa.nrodocumento'), 'nrodocumento'],
    ],
    raw: true,
    include: [{ model: models.Vehiculo_Temporada, attributes: [] }, { model: models.Personal_Empresa, attributes: [] }]
  }))
  personal_vehiculos = _.groupBy(personal_vehiculos, 'idtemporada');
  if (err) return res.status(500).json({ message: `${err}` })
  if (personal_vehiculos == null) return res.status(404).json({ message: `Personal_Vehiculos nulos` })
  res.status(200).json(personal_vehiculos)
}

async function byRange(req, res) {
  console.log(req.body);
  let where;
  if (req.body.idpuntoentrega == -1) {
    where = {
      estado: 'A',
      fecha: {
        [models.Sequelize.Op.between]: [moment(req.body.inicio), moment(req.body.fin)]
      }

    };
  } else {
    where = {
      estado: 'A', idpuntoentrega: req.body.idpuntoentrega, 
      fecha: {
        [models.Sequelize.Op.between]: [moment(req.body.inicio), moment(req.body.fin)]
      }
    };
  }

  let [err, personal_vehiculos] = await get(models.Personal_Vehiculo.findAll({
    where,
    raw: true,
    attributes: [[models.Sequelize.col('Vehiculo_Temporada.Temporada.id'), 'idtemporada'],
    [models.Sequelize.col('Personal_Empresa.apellidopaterno'), 'apellidopaterno'],
    [models.Sequelize.col('Personal_Empresa.apellidomaterno'), 'apellidomaterno'],
    [models.Sequelize.col('Personal_Empresa.nombres'), 'nombres'],
    [models.Sequelize.col('Personal_Empresa.nrodocumento'), 'nrodocumento'],
    [models.Sequelize.col('Punto_Entrega.nombre'), 'puntoentrega'],
    [models.Sequelize.col('Vehiculo_Temporada.placa'), 'placa'],
    [models.Sequelize.col('Vehiculo_Temporada.Temporada.anio'), 'anio'],
    [models.Sequelize.col('Vehiculo_Temporada.Temporada.periodo'), 'periodo'],
    [models.Sequelize.col('Vehiculo_Temporada.Temporada.fechainicio'), 'fechainicio'],
    [models.Sequelize.col('Vehiculo_Temporada.Temporada.fechafin'), 'fechafin'],
      'id', 'codigosap', 'fecha', 'hora', 'apto'],
    include: [{ model: models.Personal_Empresa, attributes: [] }, { model: models.Punto_Entrega, attributes: [] },
    {
      model: models.Vehiculo_Temporada, attributes: [],
      include: [{ model: models.Temporada, attributes: [] }]
    }]
  }))

  /* console.log(err); */

  if (err) return res.status(500).json({ message: `${err}` })
  if (personal_vehiculos == null) return res.status(404).json({ message: `Personal_Vehiculos nulos` })

  let codigos = _.map(personal_vehiculos, _.partialRight(_.pick, [/* 'codigosap',  */'idtemporada']));

  let [err2, personal_apto_temporada] = await get(models.Personal_Apto_Temporada.findAll({
    where: codigos
  }))

  for (let j = 0; j < personal_vehiculos.length; j++) {
    const e = personal_vehiculos[j];
    personal_vehiculos[j].apto = false;
    for (let i = 0; i < personal_apto_temporada.length; i++) {
      const element = personal_apto_temporada[i];
      if (element.idtemporada == e.idtemporada && element.codigosap == e.codigosap) {
        personal_vehiculos[j].apto = true;
        break;
      }
    }
  }
  if (err2) return res.status(500).json({ message: `${err2}` })
  if (personal_apto_temporada == null) return res.status(404).json({ message: `Personal_Apto_Temporada nulos` })

  res.status(200).json(personal_vehiculos)
}

async function getPersonal_Vehiculo(req, res) {
  let [err, personal_vehiculo] = await get(models.Personal_Vehiculo.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  console.log(err)
  if (err) return res.status(500).json({ message: `{err}` })
  if (personal_vehiculo == null) return res.status(404).json({ message: `Personal_Vehiculos nulos` })
  res.status(200).json(personal_vehiculo)
}

async function createPersonal_Vehiculo(req, res) {
  let [err, personal_vehiculo] = await get(models.Personal_Vehiculo.create({
    //all fields to insert

    accion: 'I',
    accion_usuario: 'Creo un nuevo personal_vehiculo.',
    ip: req.ip,
    usuario: 0
  }))
  if (err) return res.status(500).json({ message: `{err}` })
  if (personal_vehiculo == null) return res.status(404).json({ message: `Personal_Vehiculos nulos` })
  res.status(200).json(personal_vehiculo)
}


async function updatePersonal_Vehiculo(req, res) {
  let [err, personal_vehiculo] = await get(models.Personal_Vehiculo.update({
    //all fields to update

    accion: 'U',
    accion_usuario: 'Edito un personal_vehiculo.',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.body.id, estado: 'A'
    },
    individualHooks: true,
    validate: false
  }))
  if (err) return res.status(500).json({ message: `{err}` })
  if (personal_vehiculo == null) return res.status(404).json({ message: `Personal_Vehiculos nulos` })
  res.status(200).json(personal_vehiculo[1][0].dataValues)
}


async function deletePersonal_Vehiculo(req, res) {
  let [err, personal_vehiculo] = await get(models.Personal_Vehiculo.update({
    estado: 'I',

    accion_usuario: 'Elimino un personal_vehiculo.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  }, {
    where: {
      id: req.params.id, estado: 'A'
    },
    individualHooks: true
  }))
  if (err) return res.status(500).json({ message: `{err}` })
  if (personal_vehiculo == null) return res.status(404).json({ message: `Personal_Vehiculos nulos` })
  res.status(200).json(personal_vehiculo[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
    return [null, data];
  })
    .catch(err => [err]);
}

module.exports = {
  getPersonal_Vehiculos,
  getPersonal_VehiculosByTemporada,
  getPersonal_Vehiculo,
  byRange,
  createPersonal_Vehiculo,
  updatePersonal_Vehiculo,
  deletePersonal_Vehiculo
}