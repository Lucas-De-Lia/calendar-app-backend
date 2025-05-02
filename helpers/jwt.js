const jwt = require('jsonwebtoken');

//nota si el token es manipulado o alterado, el token no es valido y se genera un nuevo toke
// los parametros de la func son el payload
const generarJWT = ( uid, name ) => {

    return new Promise( ( resolve, reject ) => {
        //genereacion JWT
        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            //aca van opciones de firmado y expiracion del token
            expiresIn: '2h'// tiempo de expiracion del token 2 hrs
        }, ( err , token ) => {
            //si hay un error en la generacion del token, se rechaza la promesa
            //si no hay error se resuelve la promesa con el token generado
            if( err ){
                console.log(err);
                reject("No se pudo generar el JWT");
            }
            resolve( token );
        });
    })

}

module.exports = generarJWT;