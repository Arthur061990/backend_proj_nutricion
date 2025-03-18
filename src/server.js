const cors = require("cors")

const express = require('express');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('¡API /');
});

app.post('/registro', (req, res) => {
    console.log("registrando a ",req.body.nombre)
    res.json(req.body)
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});