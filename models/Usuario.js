const { Schema, model } = require('mongoose');

//crea un indice donde se almacenan los usuarios
const UsuarioSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
});

module.exports = model('Usuario', UsuarioSchema);