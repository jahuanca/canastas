'use strict'
const models=require('../models')
const moment=require('moment')

async function getPersonal_Empresas(req,res){
  let [err,personal_empresas]=await get(models.Personal_Empresa.findAll({
    where:{itemgrupopersonal: 1,},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_empresas==null) return res.status(404).json({message: `Personal_Empresas nulos`})
  res.status(200).json(personal_empresas)
}

async function getPersonal_Empresa(req,res){
  let [err,personal_empresa]=await get(models.Personal_Empresa.findOne({
    where:{codigoempresa: req.params.id,},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_empresa==null) return res.status(404).json({message: `Personal_Empresas nulos`})
  res.status(200).json(personal_empresa)
}
//0000679_ 218

async function getPersonal_EmpresaBySubdivision(req,res){
  let [err,personal_empresa]=await get(models.Personal_Empresa.findAll({
    /* where:{id: req.params.id, estado: 'A'}, */
    include: [
      {model: models.PersonalEmpresa_Subdivision, where: {idsubdivision: req.params.id}, required: true}
    ]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(personal_empresa==null) return res.status(404).json({message: `Personal_Empresas nulos`})
  res.status(200).json(personal_empresa)
}

async function createPersonal_Empresa(req,res){
  let [err,personal_empresa]=await get(models.Personal_Empresa.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo personal_empresa.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(personal_empresa==null) return res.status(404).json({message: `Personal_Empresas nulos`})
  res.status(200).json(personal_empresa)
}


async function updatePersonal_Empresa(req,res){
  let [err,personal_empresa]=await get(models.Personal_Empresa.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un personal_empresa.',
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
  if(personal_empresa==null) return res.status(404).json({message: `Personal_Empresas nulos`})
  res.status(200).json(personal_empresa[1][0].dataValues)
}


async function deletePersonal_Empresa(req,res){
  let [err,personal_empresa]=await get(models.Personal_Empresa.update({
    estado: 'I',

    accion_usuario: 'Elimino un personal_empresa.',
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
  if(personal_empresa==null) return res.status(404).json({message: `Personal_Empresas nulos`})
  res.status(200).json(personal_empresa[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getPersonal_Empresas,
  getPersonal_EmpresaBySubdivision,
  getPersonal_Empresa,
  createPersonal_Empresa,
  updatePersonal_Empresa,
  deletePersonal_Empresa
}