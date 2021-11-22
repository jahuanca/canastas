'use strict'
const models=require('../models')

async function getVehiculo_Temporadas(req,res){
  let [err,vehiculo_temporadas]=await get(models.Vehiculo_Temporada.findAll({
    /* where:{estado: 'A'}, */
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(vehiculo_temporadas==null) return res.status(404).json({message: `Vehiculo_Temporadas nulos`})
  res.status(200).json(vehiculo_temporadas)
}

async function getVehiculo_Temporada(req,res){
  let [err,vehiculo_temporada]=await get(models.Vehiculo_Temporada.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(vehiculo_temporada==null) return res.status(404).json({message: `Vehiculo_Temporadas nulos`})
  res.status(200).json(vehiculo_temporada)
}

async function createVehiculo_Temporada(req,res){
  let [err,vehiculo_temporada]=await get(models.Vehiculo_Temporada.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo vehiculo_temporada.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(vehiculo_temporada==null) return res.status(404).json({message: `Vehiculo_Temporadas nulos`})
  res.status(200).json(vehiculo_temporada)
}


async function updateVehiculo_Temporada(req,res){
  let [err,vehiculo_temporada]=await get(models.Vehiculo_Temporada.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un vehiculo_temporada.',
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
  if(vehiculo_temporada==null) return res.status(404).json({message: `Vehiculo_Temporadas nulos`})
  res.status(200).json(vehiculo_temporada[1][0].dataValues)
}


async function deleteVehiculo_Temporada(req,res){
  let [err,vehiculo_temporada]=await get(models.Vehiculo_Temporada.update({
    estado: 'I',

    accion_usuario: 'Elimino un vehiculo_temporada.',
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
  if(vehiculo_temporada==null) return res.status(404).json({message: `Vehiculo_Temporadas nulos`})
  res.status(200).json(vehiculo_temporada[1][0].dataValues)
}

async function createAllVehiculo_Temporada(req, res) {
    try {
        const result = await models.sequelize.transaction(async (t) => {
            const tarea = await models.Vehiculo_Temporada.create({
                idtemporada: req.body.idtemporada,
                idvehiculo: req.body.idvehiculo,
                idusuario: req.body.idusuario,
                placa: req.body.placa,
                fecha: req.body.fecha,
                hora: req.body.hora,
                accion: 'I',
                usuario: 0,
                ip: req.ip,
                accion_usuario: 'Registro un nuevo vehiculo con personal.',
            }, { transaction: t });

            if (req.body.Personal_Vehiculos) {
                for (let i = 0; i < req.body.Personal_Vehiculos.length; i++) {
                    req.body.Personal_Vehiculos[i].idvehiculotemporada=tarea.id;
                    req.body.Personal_Vehiculos[i].apto=true;
                }
                await models.Personal_Vehiculo.bulkCreate(req.body.Personal_Vehiculos, { transaction: t });
            }
            /* trabajador.dataValues.usuario=user; */
            return tarea;
        });
        res.status(200).json(result)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Error en el servidor ${error}` })
    }
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getVehiculo_Temporadas,
  getVehiculo_Temporada,
  createVehiculo_Temporada,
  createAllVehiculo_Temporada,
  updateVehiculo_Temporada,
  deleteVehiculo_Temporada,
}