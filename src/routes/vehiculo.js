'use strict'
const express=require('express')
const router=express.Router()
const vehiculo=require('../controllers/vehiculo')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Vehiculo/:
 *  get:
 *    tags: [Vehiculo]
 *    description: Obtiene todos los Vehiculos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',vehiculo.getVehiculos)
router.get('/id/:id',vehiculo.getVehiculo)
router.post('/create',vehiculo.createVehiculo)
router.put('/update',vehiculo.updateVehiculo)
router.delete('/delete/:id', vehiculo.deleteVehiculo)

module.exports=router
/** 
* @swagger
*definitions:
*  Vehiculo:           
*    type: object
*    required:
*      - cod_Vehiculo
*    properties:
*      cod_Vehiculo:
*        type: integer
*/