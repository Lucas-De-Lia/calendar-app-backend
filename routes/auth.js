/* 
Rutas de usuarios /auth
host = /api/auth 
*/
const express = require('express');
const router = express.Router(); //Router es un middleware que me permite crear rutas
const { check } = require('express-validator'); //para validar los datos que vienen en el body de la peticion
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt'); //middleware para validar el token
router.post(
    '/new',
    [ //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio y debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ] ,
    crearUsuario );

router.post('/',
     [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').isLength({ min: 6 }),
        validarCampos
     ],
     loginUsuario );

router.get('/renew',validarJWT, revalidarToken);


module.exports = router; //exporto el router para poder usarlo en el index.js