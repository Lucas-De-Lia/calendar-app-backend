// el req es la peticion y el res es la respuesta
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const generarJWT = require('../helpers/jwt');

const crearUsuario = async( req , res = response ) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if( usuario ) {
            return res.status(400).json({
                ok:false,
                msg:'El usuario ya existe con ese email'
            });
        }
        
        usuario = new Usuario( req.body );
    
        // Encriptar contraseña
        //salt para encriptar la contraseña, numero/informacion aleatorio
        const salt = bcrypt.genSaltSync(); 
        //argumento es el numero de vueltas 
        usuario.password = bcrypt.hashSync( password, salt );
        
        await usuario.save();
        // generar el token - JWT
        const token = await generarJWT( usuario.id, usuario.name );
    
        res.status(201).json({ 
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        });  

    } catch (error) {

        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        });

    }
}

const loginUsuario = async ( req , res = response) => {

    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });

        if( !usuario ) {
            return res.status(400).json({
                ok:false,
                msg:'No existe un usuario con ese email'
            });
        }
        
        // confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if(!validPassword ) {
            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            });
        }
    
        // generar el token - JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        });

    }

}

const revalidarToken = ( req , res = response) => {
    res.json({ 
        ok:true,
        msg:'renew',
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}