'use strict'
const models=require('../models')

async function getUsuarios(req,res){
  let [err,usuarios]=await get(models.Usuario.findAll({
    /* where:{estado: 'A'},*/
    include: [{all: true}],
    
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(usuarios==null) return res.status(404).json({message: `Usuarios nulos`})
  res.status(200).json(usuarios)
}

async function getUsuario(req,res){
  let [err,usuario]=await get(models.Usuario.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
  res.status(200).json(usuario)
}

async function createUsuario(req,res){
  let [err,usuario]=await get(models.Usuario.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo usuario.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
  res.status(200).json(usuario)
}


async function updateUsuario(req,res){
  let [err,usuario]=await get(models.Usuario.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un usuario.',
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
  if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
  res.status(200).json(usuario[1][0].dataValues)
}


async function deleteUsuario(req,res){
  let [err,usuario]=await get(models.Usuario.update({
    estado: 'I',

    accion_usuario: 'Elimino un usuario.',
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
  if(usuario==null) return res.status(404).json({message: `Usuarios nulos`})
  res.status(200).json(usuario[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario
}