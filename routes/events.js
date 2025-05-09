const express = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = express.Router();

// Middleware para validar el JWT en todas las rutas - Nota: Solo valida las rutas que estas abajo de esta linea
router.use(validarJWT);
/* 
    Event Routes
    /api/events
*/
//Obtener eventos
router.get('/',getEventos );

//Crear evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),//custom me permite crear mis propias validaciones
        check('end', 'La fecha de fin es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento);
//Actualizar evento
router.put('/:id',actualizarEvento);
//Eliminar evento
router.delete('/:id',eliminarEvento);

module.exports = router;