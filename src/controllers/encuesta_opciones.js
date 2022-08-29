'use strict'
const models=require('../models')

async function getEncuestaOpcionessCount(req,res){
  let [err,encuesta_opciones]=await get(models.EncuestaOpciones.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_opciones==null) return res.status(404).json({message: `EncuestaOpcioness nulos`})
  res.status(200).json(encuesta_opciones)
}

async function getEncuestaOpcionessByLimitAndOffset(req,res){
  let [err,encuesta_opciones]=await get(models.EncuestaOpciones.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_opciones==null) return res.status(404).json({message: `EncuestaOpcioness nulos`})
  res.status(200).json(encuesta_opciones)
}

async function getEncuestaOpcioness(req,res){
  let [err,encuesta_opciones]=await get(models.EncuestaOpciones.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_opciones==null) return res.status(404).json({message: `EncuestaOpcioness nulos`})
  res.status(200).json(encuesta_opciones)
}

async function getEncuestaOpciones(req,res){
  let [err,encuesta_opcione]=await get(models.EncuestaOpciones.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_opcione==null) return res.status(404).json({message: `EncuestaOpcioness nulos`})
  res.status(200).json(encuesta_opcione)
}

async function createEncuestaOpciones(req,res){
  let [err,encuesta_opcione]=await get(models.EncuestaOpciones.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo encuesta_opcione.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_opcione==null) return res.status(404).json({message: `EncuestaOpcioness nulos`})
  res.status(200).json(encuesta_opcione)
}


async function updateEncuestaOpciones(req,res){
  let [err,encuesta_opcione]=await get(models.EncuestaOpciones.update({
    //all fields to update
    
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
  if(encuesta_opcione==null) return res.status(404).json({message: `EncuestaOpcioness nulos`})
  res.status(200).json(encuesta_opcione[1][0].dataValues)
}


async function deleteEncuestaOpciones(req,res){
  let [err,encuesta_opcione]=await get(models.EncuestaOpciones.update({
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
  if(encuesta_opcione==null) return res.status(404).json({message: `EncuestaOpcioness nulos`})
  res.status(200).json(encuesta_opcione[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getEncuestaOpcionessCount,
  getEncuestaOpcionessByLimitAndOffset,
  getEncuestaOpcioness,
  getEncuestaOpciones,
  createEncuestaOpciones,
  updateEncuestaOpciones,
  deleteEncuestaOpciones
}