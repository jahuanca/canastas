'use strict'
const express=require('express')
const router=express.Router()
const respuesta=require('../controllers/respuesta')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Respuesta/:
 *  get:
 *    tags: [Respuesta]
 *    description: Obtiene todos los Respuestas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',respuesta.getRespuestas)
router.get('/count',respuesta.getRespuestasCount)
router.get('/id_encuesta/:id',respuesta.getRespuestasOfEncuesta)
router.get('/range&limit=:limit?&offset=:offset',respuesta.getRespuestasByLimitAndOffset)
router.get('/id/:id',respuesta.getRespuesta)
router.post('/create',respuesta.createRespuesta)
router.post('/createAll',respuesta.createAllRespuesta)
router.put('/update',respuesta.updateRespuesta)
router.delete('/delete/:id', respuesta.deleteRespuesta)

module.exports=router
/** 
* @swagger
*definitions:
*  Respuesta:           
*    type: object
*    required:
*      - cod_Respuesta
*    properties:
*      cod_Respuesta:
*        type: integer
*/