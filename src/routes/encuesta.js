'use strict'
const express=require('express')
const router=express.Router()
const encuesta=require('../controllers/encuesta')
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
router.get('/',encuesta.getEncuestas)
router.get('/report/:id',encuesta.getEncuestasReport)
router.get('/count',encuesta.getEncuestasCount)
router.get('/range&limit=:limit?&offset=:offset',encuesta.getEncuestasByLimitAndOffset)
router.get('/id/:id',encuesta.getEncuesta)
router.post('/create',encuesta.createEncuesta)
router.put('/update',encuesta.updateEncuesta)
router.delete('/delete/:id', encuesta.deleteEncuesta)

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