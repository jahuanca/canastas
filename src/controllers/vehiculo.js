'use strict'
const models = require('../models')

async function getVehiculos(req, res) {
    let [err, vehiculos] = await get(models.Vehiculo.findAll({
        /* where:{estado: 'A'}, */
        include: [{ all: true }]
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (vehiculos == null) return res.status(404).json({ message: `Vehiculos nulos` })
    res.status(200).json(vehiculos)
}

async function getVehiculo(req, res) {
    let [err, vehiculo] = await get(models.Vehiculo.findOne({
        where: { id: req.params.id, estado: 'A' },
        include: [{ all: true }]
    }))
    console.log(err)
    if (err) return res.status(500).json({ message: `${err}` })
    if (vehiculo == null) return res.status(404).json({ message: `Vehiculos nulos` })
    res.status(200).json(vehiculo)
}

async function createVehiculo(req, res) {
    let [err, vehiculo] = await get(models.Vehiculo.create({
        placa: req.body.placa,
        modelo: req.body.modelo,

        accion: 'I',
        accion_usuario: 'Creo un nuevo vehiculo.',
        ip: req.ip,
        usuario: 0
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (vehiculo == null) return res.status(404).json({ message: `Vehiculos nulos` })
    res.status(200).json(vehiculo)
}


async function updateVehiculo(req, res) {
    let [err, vehiculo] = await get(models.Vehiculo.update({
        placa: req.body.placa,
        modelo: req.body.modelo,

        accion: 'U',
        accion_usuario: 'Edito un vehiculo.',
        ip: req.ip,
        usuario: 0
    }, {
        where: {
            id: req.body.id, /* estado: 'A' */
        },
        individualHooks: true,
        validate: false
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (vehiculo == null) return res.status(404).json({ message: `Vehiculos nulos` })
    res.status(200).json(vehiculo[1][0].dataValues)
}


async function deleteVehiculo(req, res) {
    let [err, vehiculo] = await get(models.Vehiculo.update({
        estado: 'I',

        accion_usuario: 'Elimino un vehiculo.',
        accion: 'D',
        ip: req.ip,
        usuario: 0
    }, {
        where: {
            id: req.params.id, estado: 'A'
        },
        individualHooks: true
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (vehiculo == null) return res.status(404).json({ message: `Vehiculos nulos` })
    res.status(200).json(vehiculo[1][0].dataValues)
}


function get(promise) {
    return promise.then(data => {
        return [null, data];
    })
        .catch(err => [err]);
}

module.exports = {
    getVehiculos,
    getVehiculo,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo
}