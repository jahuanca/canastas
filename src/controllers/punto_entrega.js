'use strict'
const models=require('../models')

async function getPunto_Entregas(req,res){
  let [err,punto_entregas]=await get(models.Punto_Entrega.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `err`})
  if(punto_entregas==null) return res.status(404).json({message: `Punto_Entregas nulos`})
  res.status(200).json(punto_entregas)
}

async function getPunto_Entrega(req,res){
  let [err,punto_entrega]=await get(models.Punto_Entrega.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(punto_entrega==null) return res.status(404).json({message: `Punto_Entregas nulos`})
  res.status(200).json(punto_entrega)
}

async function createPunto_Entrega(req,res){
  let [err,punto_entrega]=await get(models.Punto_Entrega.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo punto_entrega.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(punto_entrega==null) return res.status(404).json({message: `Punto_Entregas nulos`})
  res.status(200).json(punto_entrega)
}


async function updatePunto_Entrega(req,res){
  let [err,punto_entrega]=await get(models.Punto_Entrega.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un punto_entrega.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `err`})
  if(punto_entrega==null) return res.status(404).json({message: `Punto_Entregas nulos`})
  res.status(200).json(punto_entrega[1][0].dataValues)
}


async function deletePunto_Entrega(req,res){
  let [err,punto_entrega]=await get(models.Punto_Entrega.update({
    estado: 'I',

    accion_usuario: 'Elimino un punto_entrega.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `err`})
  if(punto_entrega==null) return res.status(404).json({message: `Punto_Entregas nulos`})
  res.status(200).json(punto_entrega[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPunto_Entregas,
  getPunto_Entrega,
  createPunto_Entrega,
  updatePunto_Entrega,
  deletePunto_Entrega
}