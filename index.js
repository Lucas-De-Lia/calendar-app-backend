const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config(); //para cargar las variables de entorno

// Creo el servidor

const app = express();

//Base de datos
dbConnection();

//Directorio publico
//use en express es un middleware(funcion que se ejecuta cuando se hace una peticion)
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() ); 
//para poder leer el body de las peticiones en formato json


//Rutas -> uso un middleware para poder poner las rutas en otro archivo
app.use('/api/auth', require('./routes/auth'));


// Escucho peticiones

app.listen( process.env.PORT, ( ) => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});