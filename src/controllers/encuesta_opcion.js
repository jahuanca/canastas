'use strict'
const models=require('../models')

async function getEncuestaOpcionsCount(req,res){
  let [err,encuesta_opciones]=await get(models.EncuestaOpcion.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_opciones==null) return res.status(404).json({message: `EncuestaOpcions nulos`})
  res.status(200).json(encuesta_opciones)
}

async function getEncuestaOpcionsByLimitAndOffset(req,res){
  let [err,encuesta_opciones]=await get(models.EncuestaOpcion.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_opciones==null) return res.status(404).json({message: `EncuestaOpcions nulos`})
  res.status(200).json(encuesta_opciones)
}

async function getEncuestaOpcions(req,res){
  let [err,encuesta_opciones]=await get(models.EncuestaOpcion.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_opciones==null) return res.status(404).json({message: `EncuestaOpcions nulos`})
  res.status(200).json(encuesta_opciones)
}

async function getEncuestaOpcionsByIdEncuesta(req,res){
  let [err,encuesta_opciones]=await get(models.EncuestaOpcion.findAll({
    where:{estado: 'A', idencuesta: req.params.id},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_opciones==null) return res.status(404).json({message: `EncuestaOpcions nulos`})
  res.status(200).json(encuesta_opciones)
}

async function getEncuestaOpcion(req,res){
  let [err,encuesta_opcione]=await get(models.EncuestaOpcion.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_opcione==null) return res.status(404).json({message: `EncuestaOpcions nulos`})
  res.status(200).json(encuesta_opcione)
}

async function createEncuestaOpcion(req,res){
  let [err,encuesta_opcione]=await get(models.EncuestaOpcion.create({
      idencuesta: req.body.idencuesta,
      idusuario: 1,
      opcion: req.body.opcion,
      descripcion: req.body.descripcion,
      observacion: req.body.observacion,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo encuesta_opcione.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_opcione==null) return res.status(404).json({message: `EncuestaOpcions nulos`})
  res.status(200).json(encuesta_opcione)
}


async function updateEncuestaOpcion(req,res){
  let [err,encuesta_opcione]=await get(models.EncuestaOpcion.update({
    idencuesta: req.body.idencuesta,
      idusuario: 1,
      opcion: req.body.opcion,
      descripcion: req.body.descripcion,
      observacion: req.body.observacion,
    
    accion: 'U',
    accion_usuario: 'Edito un encuesta_opcione.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_opcione==null) return res.status(404).json({message: `EncuestaOpcions nulos`})
  res.status(200).json(encuesta_opcione[1][0].dataValues)
}


async function deleteEncuestaOpcion(req,res){
  let [err,encuesta_opcione]=await get(models.EncuestaOpcion.update({
    estado: 'I',

    accion_usuario: 'Elimino un encuesta_opcione.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_opcione==null) return res.status(404).json({message: `EncuestaOpcions nulos`})
  res.status(200).json(encuesta_opcione[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getEncuestaOpcionsCount,
  getEncuestaOpcionsByLimitAndOffset,
  getEncuestaOpcions,
  getEncuestaOpcionsByIdEncuesta,
  getEncuestaOpcion,
  createEncuestaOpcion,
  updateEncuestaOpcion,
  deleteEncuestaOpcion
}