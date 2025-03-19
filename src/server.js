/*
const cors = require("cors");
require('dotenv').config(); // Cargar dotenv primero
const express = require('express');
const app = express();
const PORT = process.env.PORT //|| 3000; // Usa la variable de entorno o 3000 por defecto

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡API funcionando!');
});

app.post('/registro', (req, res) => {
    console.log("Registrando a", req.body.nombre);
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log('El servidor correrá en el puerto:', PORT);
});
*/

const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const path = require('path');
const bcrypt = require('bcrypt')

const collection = require("../models/users");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const cors = require("cors")
//const connect = mongoose.connect(process.env.MONGODB_URL);
// Express Server
const app = express()
//console.log("URL: "+process.env.MONGODB_URL)
// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
 
// Variables Entorno
dotenv.config()
const connect = mongoose.connect(process.env.MONGODB_URL);


//Secret Key para WEb Token
const SECRET_KEY = process.env.SECRET_KEY;


//const app_principal = require('./routes/routes');
const app_principal = require('../routes/routes');
app.use(app_principal)

console.log("URL: "+process.env.MONGODB_URL)
// Conexion BD
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})


 
// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

 
// SERVER LISTENING
app.listen( process.env.PORT , () => {
    console.log('Servidor web se ejecuta en el puerto ', process.env.PORT)
})

module.exports = connect;