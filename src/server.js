const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, mundo desde el backend con Node.js!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});