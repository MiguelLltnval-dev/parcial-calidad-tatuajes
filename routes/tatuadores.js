const express = require('express');
const router = express.Router();

// Almacén en memoria de tatuadores
let tatuadores = [
    { id: 1, nombre: "Carlos Méndez", especialidad: "Realismo", aniosExperiencia: 5 },
    { id: 2, nombre: "Laura Gómez", especialidad: "Tradicional", aniosExperiencia: 3 }
];

// 1. Obtener todos los tatuadores (READ)
router.get('/', (req, res) => {
    res.status(200).json(tatuadores);
});

// 2. Obtener un tatuador por ID (READ)
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tatuador = tatuadores.find(t => t.id === id);
    if (!tatuador) return res.status(404).json({ error: "Tatuador no encontrado" });
    res.status(200).json(tatuador);
});

// 3. Registrar un nuevo tatuador (CREATE)
router.post('/', (req, res) => {
    const { nombre, especialidad, aniosExperiencia } = req.body;
    if (!nombre || !especialidad) {
        return res.status(400).json({ error: "Nombre y especialidad son obligatorios" });
    }
    const nuevoTatuador = {
        id: tatuadores.length ? tatuadores[tatuadores.length - 1].id + 1 : 1,
        nombre,
        especialidad,
        aniosExperiencia: Number(aniosExperiencia) || 0
    };
    tatuadores.push(nuevoTatuador);
    res.status(201).json(nuevoTatuador);
});

// 4. Actualizar un tatuador (UPDATE)
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tatuadores.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: "Tatuador no encontrado" });

    const { nombre, especialidad, aniosExperiencia } = req.body;
    tatuadores[index] = {
        ...tatuadores[index],
        nombre: nombre || tatuadores[index].nombre,
        especialidad: especialidad || tatuadores[index].especialidad,
        aniosExperiencia: aniosExperiencia !== undefined ? Number(aniosExperiencia) : tatuadores[index].aniosExperiencia
    };
    res.status(200).json(tatuadores[index]);
});

// 5. Eliminar un tatuador (DELETE)
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const existe = tatuadores.some(t => t.id === id);
    if (!existe) return res.status(404).json({ error: "Tatuador no encontrado" });

    tatuadores = tatuadores.filter(t => t.id !== id);
    res.status(200).json({ mensaje: `Tatuador con ID ${id} eliminado exitosamente` });
});

module.exports = router;