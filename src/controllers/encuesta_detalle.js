'use strict'
const models=require('../models')

async function getEncuesta_DetallesCount(req,res){
  let [err,encuesta_detalles]=await get(models.Encuesta_Detalle.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_detalles==null) return res.status(404).json({message: `Encuesta_Detalles nulos`})
  res.status(200).json(encuesta_detalles)
}

async function getEncuesta_DetallesByLimitAndOffset(req,res){
  let [err,encuesta_detalles]=await get(models.Encuesta_Detalle.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_detalles==null) return res.status(404).json({message: `Encuesta_Detalles nulos`})
  res.status(200).json(encuesta_detalles)
}

async function getEncuesta_Detalles(req,res){
  let [err,encuesta_detalles]=await get(models.Encuesta_Detalle.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_detalles==null) return res.status(404).json({message: `Encuesta_Detalles nulos`})
  res.status(200).json(encuesta_detalles)
}

async function getEncuesta_Detalle(req,res){
  let [err,encuesta_detalle]=await get(models.Encuesta_Detalle.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_detalle==null) return res.status(404).json({message: `Encuesta_Detalles nulos`})
  res.status(200).json(encuesta_detalle)
}

async function createEncuesta_Detalle(req,res){
  let [err,encuesta_detalle]=await get(models.Encuesta_Detalle.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo encuesta_detalle.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(encuesta_detalle==null) return res.status(404).json({message: `Encuesta_Detalles nulos`})
  res.status(200).json(encuesta_detalle)
}


async function updateEncuesta_Detalle(req,res){
  let [err,encuesta_detalle]=await get(models.Encuesta_Detalle.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un encuesta_detalle.',
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
  if(encuesta_detalle==null) return res.status(404).json({message: `Encuesta_Detalles nulos`})
  res.status(200).json(encuesta_detalle[1][0].dataValues)
}


async function deleteEncuesta_Detalle(req,res){
  let [err,encuesta_detalle]=await get(models.Encuesta_Detalle.update({
    estado: 'I',

    accion_usuario: 'Elimino un encuesta_detalle.',
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
  if(encuesta_detalle==null) return res.status(404).json({message: `Encuesta_Detalles nulos`})
  res.status(200).json(encuesta_detalle[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getEncuesta_DetallesCount,
  getEncuesta_DetallesByLimitAndOffset,
  getEncuesta_Detalles,
  getEncuesta_Detalle,
  createEncuesta_Detalle,
  updateEncuesta_Detalle,
  deleteEncuesta_Detalle
}