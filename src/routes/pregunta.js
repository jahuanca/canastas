'use strict'
const express=require('express')
const router=express.Router()
const pregunta=require('../controllers/pregunta')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Pregunta/:
 *  get:
 *    tags: [Pregunta]
 *    description: Obtiene todos los Preguntas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',pregunta.getPreguntas)
router.get('/count',pregunta.getPreguntasCount)
router.get('/range&limit=:limit?&offset=:offset',pregunta.getPreguntasByLimitAndOffset)
router.get('/id/:id',pregunta.getPregunta)
router.post('/create',pregunta.createPregunta)
router.put('/update',pregunta.updatePregunta)
router.delete('/delete/:id', pregunta.deletePregunta)

module.exports=router
/** 
* @swagger
*definitions:
*  Pregunta:           
*    type: object
*    required:
*      - cod_Pregunta
*    properties:
*      cod_Pregunta:
*        type: integer
*/