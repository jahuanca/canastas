'use strict'
const express=require('express')
const router=express.Router()
const encuesta_detalle=require('../controllers/encuesta_detalle')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Encuesta_Detalle/:
 *  get:
 *    tags: [Encuesta_Detalle]
 *    description: Obtiene todos los Encuesta_Detalles.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',encuesta_detalle.getEncuesta_Detalles)
router.get('/count',encuesta_detalle.getEncuesta_DetallesCount)
router.get('/range&limit=:limit?&offset=:offset',encuesta_detalle.getEncuesta_DetallesByLimitAndOffset)
router.get('/id/:id',encuesta_detalle.getEncuesta_Detalle)
router.post('/create',encuesta_detalle.createEncuesta_Detalle)
router.post('/createAll',encuesta_detalle.createAllEncuesta_Detalle)
router.put('/update',encuesta_detalle.updateEncuesta_Detalle)
router.delete('/delete/:id', encuesta_detalle.deleteEncuesta_Detalle)

module.exports=router
/** 
* @swagger
*definitions:
*  Encuesta_Detalle:           
*    type: object
*    required:
*      - cod_Encuesta_Detalle
*    properties:
*      cod_Encuesta_Detalle:
*        type: integer
*/