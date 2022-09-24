'use strict'
const express=require('express')
const router=express.Router()
const respuestapersonal=require('../controllers/v_respuestaspersonal')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Encuesta/:
 *  get:
 *    tags: [Encuesta]
 *    description: Obtiene todos los Encuestas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',respuestapersonal.getRespuestasPersonal)
router.get('/count',respuestapersonal.getRespuestasPersonalCount)
router.get('/range&limit=:limit?&offset=:offset',respuestapersonal.getRespuestasPersonalByLimitAndOffset)
router.get('/id/:id',respuestapersonal.getRespuestaPersona)
router.post('/range',respuestapersonal.byRange)
//router.post('/create',encuesta.createEncuesta)
//router.put('/update',encuesta.updateEncuesta)
//router.delete('/delete/:id', encuesta.deleteEncuesta)

module.exports=router
/** 
* @swagger
*definitions:
*  Encuesta:           
*    type: object
*    required:
*      - cod_Encuesta
*    properties:
*      cod_Encuesta:
*        type: integer
*/