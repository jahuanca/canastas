'use strict'
const models=require('../models')

async function getUnidadNegocios(req,res){
  let [err,unidadnegocios]=await get(models.unidadnegocio.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(unidadnegocios==null) return res.status(404).json({message: `unidadnegocios nulos`})
  res.status(200).json(unidadnegocios)
}

async function getUnidadNegocio(req,res){
  let [err,unidadnegocio]=await get(models.unidadnegocio.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(unidadnegocio==null) return res.status(404).json({message: `unidadnegocio nulos`})
  res.status(200).json(unidadnegocio)
}



function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getUnidadNegocios,
  getUnidadNegocio
  //createSubdivision,
  //updateSubdivision,
  //deleteSubdivision
}