const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/auth');
const api_registro_Controller = require('../controllers/signup');
const api_login_Controller = require('../controllers/signin');

/*
    Endpoint Registro
*/
    router.post("/registro", api_registro_Controller.nuevoUsuario);
/*
    Endpoint Login
*/
    router.post("/ingreso", api_login_Controller.login);



module.exports = router