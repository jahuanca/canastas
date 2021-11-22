'use strict'
const models=require('../models')

async function getPersonal_Vehiculos(req,res){
  let [err,personal_vehiculos]=await get(models.Personal_Vehiculo.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `{err}`})
  if(personal_vehiculos==null) return res.status(404).json({message: `Personal_Vehiculos nulos`})
  res.status(200).json(personal_vehiculos)
}

async function byRange(req,res){
  console.log(req.body);
  let [err,personal_vehiculos]=await get(models.Personal_Vehiculo.findAll({
    where:{idpuntoentrega: req.body.idpuntoentrega},
    include: [{model: models.Personal_Empresa,}, {model: models.Punto_Entrega}, 
      {model: models.Vehiculo_Temporada, include: [{all: true}]}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_vehiculos==null) return res.status(404).json({message: `Personal_Vehiculos nulos`})
  res.status(200).json(personal_vehiculos)
}

async function getPersonal_Vehiculo(req,res){
  let [err,personal_vehiculo]=await get(models.Personal_Vehiculo.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `{err}`})
  if(personal_vehiculo==null) return res.status(404).json({message: `Personal_Vehiculos nulos`})
  res.status(200).json(personal_vehiculo)
}

async function createPersonal_Vehiculo(req,res){
  let [err,personal_vehiculo]=await get(models.Personal_Vehiculo.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo personal_vehiculo.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `{err}`})
  if(personal_vehiculo==null) return res.status(404).json({message: `Personal_Vehiculos nulos`})
  res.status(200).json(personal_vehiculo)
}


async function updatePersonal_Vehiculo(req,res){
  let [err,personal_vehiculo]=await get(models.Personal_Vehiculo.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un personal_vehiculo.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `{err}`})
  if(personal_vehiculo==null) return res.status(404).json({message: `Personal_Vehiculos nulos`})
  res.status(200).json(personal_vehiculo[1][0].dataValues)
}


async function deletePersonal_Vehiculo(req,res){
  let [err,personal_vehiculo]=await get(models.Personal_Vehiculo.update({
    estado: 'I',

    accion_usuario: 'Elimino un personal_vehiculo.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `{err}`})
  if(personal_vehiculo==null) return res.status(404).json({message: `Personal_Vehiculos nulos`})
  res.status(200).json(personal_vehiculo[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPersonal_Vehiculos,
  getPersonal_Vehiculo,
  byRange,
  createPersonal_Vehiculo,
  updatePersonal_Vehiculo,
  deletePersonal_Vehiculo
}