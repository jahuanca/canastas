'use strict'
const express=require('express')
const router=express.Router()
const personal_vehiculo=require('../controllers/personal_vehiculo')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Personal_Vehiculo/:
 *  get:
 *    tags: [Personal_Vehiculo]
 *    description: Obtiene todos los Personal_Vehiculos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',personal_vehiculo.getPersonal_Vehiculos)
router.get('/id/:id',personal_vehiculo.getPersonal_Vehiculo)
router.post('/create',personal_vehiculo.createPersonal_Vehiculo)
router.post('/range',personal_vehiculo.byRange)
router.put('/update',personal_vehiculo.updatePersonal_Vehiculo)
router.delete('/delete/:id', personal_vehiculo.deletePersonal_Vehiculo)

module.exports=router
/** 
* @swagger
*definitions:
*  Personal_Vehiculo:           
*    type: object
*    required:
*      - cod_Personal_Vehiculo
*    properties:
*      cod_Personal_Vehiculo:
*        type: integer
*/