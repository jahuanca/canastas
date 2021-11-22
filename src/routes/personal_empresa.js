'use strict'
const express=require('express')
const router=express.Router()
const personal_empresa=require('../controllers/personal_empresa')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Personal_Empresa/:
 *  get:
 *    tags: [Personal_Empresa]
 *    description: Obtiene todos los Personal_Empresas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',personal_empresa.getPersonal_Empresas)
router.get('/subdivision/:id',personal_empresa.getPersonal_EmpresaBySubdivision)
router.get('/id/:id',personal_empresa.getPersonal_Empresa)
router.post('/create',personal_empresa.createPersonal_Empresa)
router.put('/update',personal_empresa.updatePersonal_Empresa)
router.delete('/delete/:id', personal_empresa.deletePersonal_Empresa)

module.exports=router
/** 
* @swagger
*definitions:
*  Personal_Empresa:           
*    type: object
*    required:
*      - cod_Personal_Empresa
*    properties:
*      cod_Personal_Empresa:
*        type: integer
*/