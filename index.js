const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config(); //para cargar las variables de entorno
const cors = require('cors'); //para permitir el acceso a la api desde otros dominios
// Creo el servidor

const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio publico
//use en express es un middleware(funcion que se ejecuta cuando se hace una peticion)
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() ); 
//para poder leer el body de las peticiones en formato json


//Rutas -> uso un middleware para poder poner las rutas en otro archivo
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events',require('./routes/events'));

// Escucho peticiones

app.listen( process.env.PORT, ( ) => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});

