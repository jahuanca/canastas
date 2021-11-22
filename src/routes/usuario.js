'use strict'
const express=require('express')
const router=express.Router()
const usuario=require('../controllers/usuario')
/* const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth') */

/**
 * @swagger
 * /Usuario/:
 *  get:
 *    tags: [Usuario]
 *    description: Obtiene todos los Usuarios.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',usuario.getUsuarios)
router.get('/id/:id',usuario.getUsuario)
router.post('/create',usuario.createUsuario)
router.put('/update',usuario.updateUsuario)
router.delete('/delete/:id', usuario.deleteUsuario)

module.exports=router
/** 
* @swagger
*definitions:
*  Usuario:           
*    type: object
*    required:
*      - cod_Usuario
*    properties:
*      cod_Usuario:
*        type: integer
*/