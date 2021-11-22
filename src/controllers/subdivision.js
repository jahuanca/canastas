'use strict'
const models=require('../models')

async function getSubdivisions(req,res){
  let [err,subdivisions]=await get(models.Subdivision.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `err`})
  if(subdivisions==null) return res.status(404).json({message: `Subdivisions nulos`})
  res.status(200).json(subdivisions)
}

async function getSubdivision(req,res){
  let [err,subdivision]=await get(models.Subdivision.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(subdivision==null) return res.status(404).json({message: `Subdivisions nulos`})
  res.status(200).json(subdivision)
}

async function createSubdivision(req,res){
  let [err,subdivision]=await get(models.Subdivision.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo subdivision.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(subdivision==null) return res.status(404).json({message: `Subdivisions nulos`})
  res.status(200).json(subdivision)
}


async function updateSubdivision(req,res){
  let [err,subdivision]=await get(models.Subdivision.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un subdivision.',
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
  if(subdivision==null) return res.status(404).json({message: `Subdivisions nulos`})
  res.status(200).json(subdivision[1][0].dataValues)
}


async function deleteSubdivision(req,res){
  let [err,subdivision]=await get(models.Subdivision.update({
    estado: 'I',

    accion_usuario: 'Elimino un subdivision.',
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
  if(subdivision==null) return res.status(404).json({message: `Subdivisions nulos`})
  res.status(200).json(subdivision[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getSubdivisions,
  getSubdivision,
  createSubdivision,
  updateSubdivision,
  deleteSubdivision
}