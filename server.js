const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Importar rutas
const clientesRoutes = require('./routes/clientes');
app.use('/api/clientes', clientesRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: "API Estudio de Tatuajes funcionando correctamente" });
});

app.listen(PORT, () => {
    console.log(Servidor corriendo en el puerto ${PORT});
});