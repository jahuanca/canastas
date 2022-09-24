'use strict'
const models = require('../models')

async function getRespuestasPersonalCount(req, res) {
  let [err, RespuestasPersonal] = await get(models.v_respuestaspersonal.count({
    where: { estado: 'A' },
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (RespuestasPersonal == null) return res.status(404).json({ message: `RespuestasPersonal nulos` })
  res.status(200).json(RespuestasPersonal)
}

async function getRespuestasPersonalByLimitAndOffset(req, res) {
  let [err, RespuestasPersonal] = await get(models.v_respuestaspersonal.findAll({
    where: { estado: 'A' },
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (RespuestasPersonal == null) return res.status(404).json({ message: `RespuestasPersonal nulos` })
  res.status(200).json(RespuestasPersonal)
}

async function getRespuestasPersonal(req, res) {
  let [err, RespuestasPersonal] = await get(models.v_respuestaspersonal.findAll({
    where: { estado: 'A' },
    order: [['id', 'ASC']],
    include: [{all: true}]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (RespuestasPersonal == null) return res.status(404).json({ message: `RespuestasPersonal nulos` })
  res.status(200).json(RespuestasPersonal)
}

async function getRespuestaPersona(req, res) {
  let [err, RespuestasPersonal] = await get(models.v_respuestaspersonal.findOne({
    where: { id: req.params.id, estado: 'A' },
    include: [{ all: true }]
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  if (RespuestasPersonal == null) return res.status(404).json({ message: `RespuestasPersonal nulos` })
  res.status(200).json(RespuestasPersonal)
}


async function byRange(req, res) {
  console.log(req.body);
  let where;
  if (req.body.idsubdivision == -1) {
    where = {
      estado: 'A',
      fecha: {
        [models.Sequelize.Op.between]: [new Date(req.body.inicio).setHours(0,0,0), new Date(req.body.fin).setHours(23,59,59)]
      }

    };
  } else {
    where = {
      estado: 'A', idsubdivision: req.body.idsubdivision, 
      fecha: {
        [models.Sequelize.Op.between]: [new Date(req.body.inicio).setHours(0,0,0), new Date(req.body.fin).setHours(23,59,59)]
      }
    };
  }
  let wEncuesta;
  if(req.body.idencuesta == -1){
    wEncuesta= {estado: 'A'};
  }else{
    wEncuesta= {estado: 'A', idencuesta: req.body.idencuesta};
  }

  let [err, respuestas_personal] = await get(models.v_respuestaspersonal.findAll({
    where,
    raw: false,
    attributes: [
      /*[models.Sequelize.col('v_respuestas_personal.Encuesta.id'), 'idencuesta'],
      [models.Sequelize.col('Vehiculo_Temporada.Temporada.Producto.id'), 'idproducto'],
      [models.Sequelize.col('Vehiculo_Temporada.Temporada.Producto.descripcion'), 'producto'],
      [models.Sequelize.col('Vehiculo_Temporada.Temporada.descripcion'), 'temporada'],
      [models.Sequelize.col('Personal_Empresa.apellidopaterno'), 'apellidopaterno'],
      [models.Sequelize.col('Personal_Empresa.apellidomaterno'), 'apellidomaterno'],
      [models.Sequelize.col('Personal_Empresa.nombres'), 'nombres'],
      [models.Sequelize.col('Personal_Empresa.nrodocumento'), 'nrodocumento'],
      [models.Sequelize.col('Punto_Entrega.nombre'), 'puntoentrega'],
      [models.Sequelize.col('Vehiculo_Temporada.placa'), 'placa'],
      [models.Sequelize.col('Vehiculo_Temporada.Temporada.anio'), 'anio'],
      [models.Sequelize.col('Vehiculo_Temporada.Temporada.periodo'), 'periodo'],
      */
      'idrespuesta','id', 'idsubdivision','subdivision', 'descripcion','anio','periodo','titulo',
      'pregunta','opcion','opcionmanual','nombrecompleto','nrodocumento',
      'fecha','hora','unidadnegocio','etapa','campo','turno',
      'estado','createdAt','updatedAt'
      ]
   
  }))
  if (err) return res.status(500).json({ message: `${err}` })
  console.log(respuestas_personal);
  if (respuestas_personal == null) return res.status(404).json({ message: `respuestas_personal nulos` })

  res.status(200).json(respuestas_personal)
}




/*
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
    idusuario: 1,
    idtipoencuesta: 1,
    periodo: req.body.periodo,
    fechaInicio: req.body.fechaInicio,
    fechaFin: req.body.fechaFin,
    anio: req.body.anio,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    observacion: req.body.observacion,

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
*/

function get(promise) {
  return promise.then(data => {
    return [null, data];
  })
    .catch(err => [err]);
}

module.exports = {
  getRespuestasPersonalCount,
  getRespuestasPersonalByLimitAndOffset,
  byRange,
  getRespuestaPersona,
  getRespuestasPersonal
  //createEncuesta,
  //updateEncuesta,
  //deleteEncuesta
}