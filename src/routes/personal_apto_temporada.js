'use strict'
const express=require('express')
const router=express.Router()
const personal_apto_temporada=require('../controllers/personal_apto_temporada')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Personal_Apto_Temporada/:
 *  get:
 *    tags: [Personal_Apto_Temporada]
 *    description: Obtiene todos los Personal_Apto_Temporadas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',personal_apto_temporada.getPersonal_Apto_Temporadas)
router.get('/id_temporada/:idtemporada',personal_apto_temporada.getPersonal_Apto_TemporadasByIdTemporada)
router.get('/id/:id',personal_apto_temporada.getPersonal_Apto_Temporada)
router.post('/create',personal_apto_temporada.createPersonal_Apto_Temporada)
router.post('/createMany',personal_apto_temporada.createPersonal_Apto_TemporadaMany)
router.put('/update',personal_apto_temporada.updatePersonal_Apto_Temporada)
router.delete('/delete/:id', personal_apto_temporada.deletePersonal_Apto_Temporada)

module.exports=router
/** 
* @swagger
*definitions:
*  Personal_Apto_Temporada:           
*    type: object
*    required:
*      - cod_Personal_Apto_Temporada
*    properties:
*      cod_Personal_Apto_Temporada:
*        type: integer
*/