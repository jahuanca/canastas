'use strict'
const models=require('../models')

async function getProductos(req,res){
  let [err,productos]=await get(models.Producto.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `err`})
  if(productos==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(productos)
}

async function getProducto(req,res){
  let [err,producto]=await get(models.Producto.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}

async function createProducto(req,res){
  let [err,producto]=await get(models.Producto.create({
      descripcion: req.body.descripcion,
      unidad: req.body.unidad,
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo producto.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto)
}


async function updateProducto(req,res){
  let [err,producto]=await get(models.Producto.update({
    descripcion: req.body.descripcion,
    unidad: req.body.unidad,
    
    accion: 'U',
    accion_usuario: 'Edito un producto.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id,/*  estado:'A' */
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `err`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto[1][0].dataValues)
}


async function deleteProducto(req,res){
  let [err,producto]=await get(
      models.Producto.destroy({
    where:{
      id: req.params.id,
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `err`})
  if(producto==null) return res.status(404).json({message: `Productos nulos`})
  res.status(200).json(producto[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto
}