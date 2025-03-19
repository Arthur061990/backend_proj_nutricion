const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/auth');
const api_reservas_Controller = require('../controllers/signup');

/*
    Endpoint Registro
*/
    router.post("/registro", api_reservas_Controller.nuevoUsuario);



module.exports = router