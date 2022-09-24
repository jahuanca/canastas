'use strict'
const express=require('express')
const router=express.Router()
const turno=require('../controllers/encuesta_turno')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Subdivision/:
 *  get:
 *    tags: [Subdivision]
 *    description: Obtiene todos los Subdivisions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',turno.getTurnos)
router.get('/id/:id',turno.getTurno)
//router.post('/create',subdivision.createSubdivision)
//router.put('/update',subdivision.updateSubdivision)
//router.delete('/delete/:id', subdivision.deleteSubdivision)

module.exports=router
/** 
* @swagger
*definitions:
*  Subdivision:           
*    type: object
*    required:
*      - cod_Subdivision
*    properties:
*      cod_Subdivision:
*        type: integer
*/