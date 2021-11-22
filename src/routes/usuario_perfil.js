'use strict'
const express=require('express')
const router=express.Router()
const usuario_perfil=require('../controllers/usuario_perfil')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Usuario_Perfil/:
 *  get:
 *    tags: [Usuario_Perfil]
 *    description: Obtiene todos los Usuario_Perfils.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',usuario_perfil.getUsuario_Perfils)
router.get('/id/:id',usuario_perfil.getUsuario_Perfil)
router.post('/create',usuario_perfil.createUsuario_Perfil)
router.put('/update',usuario_perfil.updateUsuario_Perfil)
router.delete('/delete/:id', usuario_perfil.deleteUsuario_Perfil)

module.exports=router
/** 
* @swagger
*definitions:
*  Usuario_Perfil:           
*    type: object
*    required:
*      - cod_Usuario_Perfil
*    properties:
*      cod_Usuario_Perfil:
*        type: integer
*/