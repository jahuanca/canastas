'use strict'
const express=require('express')
const router=express.Router()
const temporada=require('../controllers/temporada')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Temporada/:
 *  get:
 *    tags: [Temporada]
 *    description: Obtiene todos los Temporadas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',temporada.getTemporadas)
router.get('/id/:id',temporada.getTemporada)
router.post('/create',temporada.createTemporada)
router.put('/update',temporada.updateTemporada)
router.delete('/delete/:id', temporada.deleteTemporada)

module.exports=router
/** 
* @swagger
*definitions:
*  Temporada:           
*    type: object
*    required:
*      - cod_Temporada
*    properties:
*      cod_Temporada:
*        type: integer
*/