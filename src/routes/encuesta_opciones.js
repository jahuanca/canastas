'use strict'
const express=require('express')
const router=express.Router()
const encuesta_opciones=require('../controllers/encuesta_opciones')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /EncuestaOpciones/:
 *  get:
 *    tags: [EncuestaOpciones]
 *    description: Obtiene todos los EncuestaOpcioness.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',encuesta_opciones.getEncuestaOpcioness)
router.get('/count',encuesta_opciones.getEncuestaOpcionessCount)
router.get('/range&limit=:limit?&offset=:offset',encuesta_opciones.getEncuestaOpcionessByLimitAndOffset)
router.get('/id/:id',encuesta_opciones.getEncuestaOpciones)
router.post('/create',encuesta_opciones.createEncuestaOpciones)
router.put('/update',encuesta_opciones.updateEncuestaOpciones)
router.delete('/delete/:id', encuesta_opciones.deleteEncuestaOpciones)

module.exports=router
/** 
* @swagger
*definitions:
*  EncuestaOpciones:           
*    type: object
*    required:
*      - cod_EncuestaOpciones
*    properties:
*      cod_EncuestaOpciones:
*        type: integer
*/