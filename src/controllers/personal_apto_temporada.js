'use strict'
const models=require('../models')

async function getPersonal_Apto_Temporadas(req,res){
  let [err,personal_apto_temporadas]=await get(models.Personal_Apto_Temporada.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_apto_temporadas==null) return res.status(404).json({message: `Personal_Apto_Temporadas nulos`})
  res.status(200).json(personal_apto_temporadas)
}

async function getPersonal_Apto_TemporadasByIdTemporada(req,res){
    let [err,personal_apto_temporadas]=await get(models.Personal_Apto_Temporada.findAll({
      where:{idtemporada: req.params.idtemporada},
      include: [{all: true}]
    }))
    if(err) return res.status(500).json({message: `${err}`})
    if(personal_apto_temporadas==null) return res.status(404).json({message: `Personal_Apto_Temporadas nulos`})
    res.status(200).json(personal_apto_temporadas)
  }

async function getPersonal_Apto_Temporada(req,res){
  let [err,personal_apto_temporada]=await get(models.Personal_Apto_Temporada.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_apto_temporada==null) return res.status(404).json({message: `Personal_Apto_Temporadas nulos`})
  res.status(200).json(personal_apto_temporada)
}

async function createPersonal_Apto_Temporada(req,res){
  let [err,personal_apto_temporada]=await get(models.Personal_Apto_Temporada.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo personal_apto_temporada.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_apto_temporada==null) return res.status(404).json({message: `Personal_Apto_Temporadas nulos`})
  res.status(200).json(personal_apto_temporada)
}

async function createPersonal_Apto_TemporadaMany(req,res){
    let [err,personal_apto_temporada]=await get(models.Personal_Apto_Temporada.bulkCreate(req.body))
    if(err) return res.status(500).json({message: `${err}`})
    if(personal_apto_temporada==null) return res.status(404).json({message: `Personal_Apto_Temporadas nulos`})
    res.status(200).json(personal_apto_temporada)
  }


async function updatePersonal_Apto_Temporada(req,res){
  let [err,personal_apto_temporada]=await get(models.Personal_Apto_Temporada.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un personal_apto_temporada.',
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
  if(personal_apto_temporada==null) return res.status(404).json({message: `Personal_Apto_Temporadas nulos`})
  res.status(200).json(personal_apto_temporada[1][0].dataValues)
}


async function deletePersonal_Apto_Temporada(req,res){
  let [err,personal_apto_temporada]=await get(models.Personal_Apto_Temporada.update({
    estado: 'I',

    accion_usuario: 'Elimino un personal_apto_temporada.',
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
  if(personal_apto_temporada==null) return res.status(404).json({message: `Personal_Apto_Temporadas nulos`})
  res.status(200).json(personal_apto_temporada[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPersonal_Apto_Temporadas,
  getPersonal_Apto_Temporada,
  createPersonal_Apto_Temporada,
  updatePersonal_Apto_Temporada,
  deletePersonal_Apto_Temporada,
  createPersonal_Apto_TemporadaMany,
  getPersonal_Apto_TemporadasByIdTemporada,
}