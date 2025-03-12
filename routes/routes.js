const express = require('express');
const router = express.Router()
const api_reservas_Controller = require('../controllers/api_registro');

/*
    Endpoint Registro
*/
    router.get("/api/registro", api_reservas_Controller.nuevoUsuario);



module.exports = router