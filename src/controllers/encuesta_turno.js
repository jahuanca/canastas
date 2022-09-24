'use strict'
const models=require('../models')

async function getTurnos(req,res){
  let [err,turnos]=await get(models.encuesta_turno.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(turnos==null) return res.status(404).json({message: `turnos nulos`})
  res.status(200).json(turnos)
}

async function getTurno(req,res){
  let [err,turno]=await get(models.encuesta_turno.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(turno==null) return res.status(404).json({message: `turno nulos`})
  res.status(200).json(turno)
}



function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTurnos,
  getTurno
  //createSubdivision,
  //updateSubdivision,
  //deleteSubdivision
}