'use strict'
const models=require('../models')

async function getUsuario_Perfils(req,res){
  let [err,usuario_perfils]=await get(models.Usuario_Perfil.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `err`})
  if(usuario_perfils==null) return res.status(404).json({message: `Usuario_Perfils nulos`})
  res.status(200).json(usuario_perfils)
}

async function getUsuario_Perfil(req,res){
  let [err,usuario_perfil]=await get(models.Usuario_Perfil.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(usuario_perfil==null) return res.status(404).json({message: `Usuario_Perfils nulos`})
  res.status(200).json(usuario_perfil)
}

async function createUsuario_Perfil(req,res){
  let [err,usuario_perfil]=await get(models.Usuario_Perfil.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo usuario_perfil.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(usuario_perfil==null) return res.status(404).json({message: `Usuario_Perfils nulos`})
  res.status(200).json(usuario_perfil)
}


async function updateUsuario_Perfil(req,res){
  let [err,usuario_perfil]=await get(models.Usuario_Perfil.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un usuario_perfil.',
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
  if(usuario_perfil==null) return res.status(404).json({message: `Usuario_Perfils nulos`})
  res.status(200).json(usuario_perfil[1][0].dataValues)
}


async function deleteUsuario_Perfil(req,res){
  let [err,usuario_perfil]=await get(models.Usuario_Perfil.update({
    estado: 'I',

    accion_usuario: 'Elimino un usuario_perfil.',
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
  if(usuario_perfil==null) return res.status(404).json({message: `Usuario_Perfils nulos`})
  res.status(200).json(usuario_perfil[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getUsuario_Perfils,
  getUsuario_Perfil,
  createUsuario_Perfil,
  updateUsuario_Perfil,
  deleteUsuario_Perfil
}