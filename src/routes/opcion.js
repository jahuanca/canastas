'use strict'
const express=require('express')
const router=express.Router()
const opcion=require('../controllers/opcion')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Opcion/:
 *  get:
 *    tags: [Opcion]
 *    description: Obtiene todos los Opcions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',opcion.getOpcions)
router.get('/count',opcion.getOpcionsCount)
router.get('/range&limit=:limit?&offset=:offset',opcion.getOpcionsByLimitAndOffset)
router.get('/id/:id',opcion.getOpcion)
router.post('/create',opcion.createOpcion)
router.put('/update',opcion.updateOpcion)
router.delete('/delete/:id', opcion.deleteOpcion)

module.exports=router
/** 
* @swagger
*definitions:
*  Opcion:           
*    type: object
*    required:
*      - cod_Opcion
*    properties:
*      cod_Opcion:
*        type: integer
*/