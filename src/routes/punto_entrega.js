'use strict'
const express=require('express')
const router=express.Router()
const punto_entrega=require('../controllers/punto_entrega')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Punto_Entrega/:
 *  get:
 *    tags: [Punto_Entrega]
 *    description: Obtiene todos los Punto_Entregas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',punto_entrega.getPunto_Entregas)
router.get('/id/:id',punto_entrega.getPunto_Entrega)
router.post('/create',punto_entrega.createPunto_Entrega)
router.put('/update',punto_entrega.updatePunto_Entrega)
router.delete('/delete/:id', punto_entrega.deletePunto_Entrega)

module.exports=router
/** 
* @swagger
*definitions:
*  Punto_Entrega:           
*    type: object
*    required:
*      - cod_Punto_Entrega
*    properties:
*      cod_Punto_Entrega:
*        type: integer
*/