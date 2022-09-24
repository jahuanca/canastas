'use strict'
const models=require('../models')

async function getCampos(req,res){
  let [err,campos]=await get(models.encuesta_campo.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(campos==null) return res.status(404).json({message: `campos nulos`})
  res.status(200).json(campos)
}

async function getCampo(req,res){
  let [err,campo]=await get(models.encuesta_campo.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(campo==null) return res.status(404).json({message: `campo nulos`})
  res.status(200).json(campo)
}



function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getCampos,
  getCampo
  //createSubdivision,
  //updateSubdivision,
  //deleteSubdivision
}