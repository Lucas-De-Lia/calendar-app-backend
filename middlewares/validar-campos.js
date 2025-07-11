const {response} = require('express');
const { validationResult } = require('express-validator');


const validarCampos = (req, res = response, next) => {
    //manejo de errores
    const errors = validationResult( req );
    if( !errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }

    next(); 
    //si no hay errores, sigo con la siguiente funcion del middleware
}

module.exports = {
    validarCampos,
}


