const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
//const collection = require("../config"); 
const router = express.Router();
const user_model = require(('../models/users')); 
const bcrypt = require('bcrypt');



async function nuevoUsuario (req, res) {

// Ruta para registrar un usuario
//router.post('/signup', async (req, res) => {
    

    // Generar el hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword 
    };

    try {
        // Check if the username already exists in the database
        const existingUser = await user_model.findOne({ email: data.email });

        if (existingUser) {
            res.send(' ¡¡¡Registro incorrecto!!! -- El usuario ya existe');
        } else {
            const userdata = await user_model.insertMany(data);
            console.log(userdata);
            res.send('¡¡ Usuario Registrado Correctamente !!');
        }
    } catch (error) {
        res.status(500).send('Error registering user.');
    }
};

module.exports = { nuevoUsuario};