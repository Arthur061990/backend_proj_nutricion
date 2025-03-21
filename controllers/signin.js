const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
//const collection = require("../config"); 
const router = express.Router();
const user_model = require(('../models/users')); 
const bcrypt = require('bcrypt');

const SECRET_KEY = process.env.SECRET_KEY;


async function login (req, res) {

// Ruta para registrar un usuario
//router.post('/signup', async (req, res) => {
    

    try {
        // Check if the username already exists in the database
        const existingUser = await user_model.findOne({ email: req.body.email });
        console.log("Password sin hash: ",req.body.password)

        /*if (!existingUser) {
            return res.send('¡¡ Correo Invalido !!');
            //return res.status(404).send("No se encuentra el correo registrado");
        }*/
        
        if (existingUser) {
            const hashedPassword = await bcrypt.hash(req.body.password, existingUser.salt);
            console.log("Password Hash BD: ",existingUser.password)
            console.log("Fronend: ",hashedPassword)
            //res.send(' Comparar contraseñas');
            if(hashedPassword  == existingUser.password){
                console.log("Autenticado")
                const token = jwt.sign({ id: req.body.email }, SECRET_KEY, {
                    expiresIn: 86400, // 24 horas
                });
                console.log("Token: ",token)
                res.json({result: token})
                //Implementacion JWT, reponder un token
                //res.json({token:"miToken"})
            }
        } else {
           /* const userdata = await user_model.insertMany(data);
            console.log(userdata);
            res.send('¡¡ Usuario Registrado Correctamente !!');*/
            console.log("USUARIO NO EXISTE")
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error Autenticando');
    }
};

module.exports = { login};