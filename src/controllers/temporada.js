'use strict'
const models=require('../models')

async function getTemporadas(req,res){
  let [err,temporadas]=await get(models.Temporada.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(temporadas==null) return res.status(404).json({message: `Temporadas nulos`})
  res.status(200).json(temporadas)
}

async function getTemporada(req,res){
  let [err,temporada]=await get(models.Temporada.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(temporada==null) return res.status(404).json({message: `Temporadas nulos`})
  res.status(200).json(temporada)
}

async function createTemporada(req,res){
  let [err,temporada]=await get(models.Temporada.create({
      anio: req.body.anio,
      periodo: req.body.periodo,
      descripcion: req.body.descripcion,
      idproducto: req.body.idproducto,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo temporada.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(temporada==null) return res.status(404).json({message: `Temporadas nulos`})
  res.status(200).json(temporada)
}


async function updateTemporada(req,res){
  let [err,temporada]=await get(models.Temporada.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un temporada.',
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
  if(temporada==null) return res.status(404).json({message: `Temporadas nulos`})
  res.status(200).json(temporada[1][0].dataValues)
}


async function deleteTemporada(req,res){
  let [err,temporada]=await get(models.Temporada.update({
    estado: 'I',

    accion_usuario: 'Elimino un temporada.',
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
  if(temporada==null) return res.status(404).json({message: `Temporadas nulos`})
  res.status(200).json(temporada[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTemporadas,
  getTemporada,
  createTemporada,
  updateTemporada,
  deleteTemporada
}