'use strict'
const models=require('../models')

async function getOpcionsCount(req,res){
  let [err,opcions]=await get(models.Opcion.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(opcions==null) return res.status(404).json({message: `Opcions nulos`})
  res.status(200).json(opcions)
}

async function getOpcionsByLimitAndOffset(req,res){
  let [err,opcions]=await get(models.Opcion.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(opcions==null) return res.status(404).json({message: `Opcions nulos`})
  res.status(200).json(opcions)
}

async function getOpcions(req,res){
  let [err,opcions]=await get(models.Opcion.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(opcions==null) return res.status(404).json({message: `Opcions nulos`})
  res.status(200).json(opcions)
}

async function getOpcion(req,res){
  let [err,opcion]=await get(models.Opcion.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(opcion==null) return res.status(404).json({message: `Opcions nulos`})
  res.status(200).json(opcion)
}

async function createOpcion(req,res){
  let [err,opcion]=await get(models.Opcion.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo opcion.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(opcion==null) return res.status(404).json({message: `Opcions nulos`})
  res.status(200).json(opcion)
}


async function updateOpcion(req,res){
  let [err,opcion]=await get(models.Opcion.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un opcion.',
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
  if(opcion==null) return res.status(404).json({message: `Opcions nulos`})
  res.status(200).json(opcion[1][0].dataValues)
}


async function deleteOpcion(req,res){
  let [err,opcion]=await get(models.Opcion.update({
    estado: 'I',

    accion_usuario: 'Elimino un opcion.',
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
  if(opcion==null) return res.status(404).json({message: `Opcions nulos`})
  res.status(200).json(opcion[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getOpcionsCount,
  getOpcionsByLimitAndOffset,
  getOpcions,
  getOpcion,
  createOpcion,
  updateOpcion,
  deleteOpcion
}