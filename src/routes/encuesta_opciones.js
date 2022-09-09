'use strict'
const express=require('express')
const router=express.Router()
const encuesta_opciones=require('../controllers/encuesta_opcion')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /EncuestaOpcion/:
 *  get:
 *    tags: [EncuestaOpcion]
 *    description: Obtiene todos los EncuestaOpcions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',encuesta_opciones.getEncuestaOpcions)
router.get('/id_encuesta/:id',encuesta_opciones.getEncuestaOpcionsByIdEncuesta)
router.get('/count',encuesta_opciones.getEncuestaOpcionsCount)
router.get('/range&limit=:limit?&offset=:offset',encuesta_opciones.getEncuestaOpcionsByLimitAndOffset)
router.get('/id/:id',encuesta_opciones.getEncuestaOpcion)
router.post('/create',encuesta_opciones.createEncuestaOpcion)
router.put('/update',encuesta_opciones.updateEncuestaOpcion)
router.delete('/delete/:id', encuesta_opciones.deleteEncuestaOpcion)

module.exports=router
/** 
* @swagger
*definitions:
*  EncuestaOpcion:           
*    type: object
*    required:
*      - cod_EncuestaOpcion
*    properties:
*      cod_EncuestaOpcion:
*        type: integer
*/