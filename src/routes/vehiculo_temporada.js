'use strict'
const express=require('express')
const router=express.Router()
const vehiculo_temporada=require('../controllers/vehiculo_temporada')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Vehiculo_Temporada/:
 *  get:
 *    tags: [Vehiculo_Temporada]
 *    description: Obtiene todos los Vehiculo_Temporadas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',vehiculo_temporada.getVehiculo_Temporadas)
router.get('/id/:id',vehiculo_temporada.getVehiculo_Temporada)
router.post('/create',vehiculo_temporada.createVehiculo_Temporada)
router.post('/createAll',vehiculo_temporada.createAllVehiculo_Temporada)
router.put('/update',vehiculo_temporada.updateVehiculo_Temporada)
router.delete('/delete/:id', vehiculo_temporada.deleteVehiculo_Temporada)

module.exports=router
/** 
* @swagger
*definitions:
*  Vehiculo_Temporada:           
*    type: object
*    required:
*      - cod_Vehiculo_Temporada
*    properties:
*      cod_Vehiculo_Temporada:
*        type: integer
*/