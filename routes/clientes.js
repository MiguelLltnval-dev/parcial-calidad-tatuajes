const express = require('express');
const router = express.Router();

// Almacén en memoria de clientes
let clientes = [
    { id: 1, nombre: "Andrés Rojas", telefono: "3001234567", email: "andres@ejemplo.com" },
    { id: 2, nombre: "Mariana Torres", telefono: "3109876543", email: "mariana@ejemplo.com" }
];

// 1. Obtener todos los clientes (READ)
router.get('/', (req, res) => {
    res.status(200).json(clientes);
});

// 2. Obtener un cliente por ID (READ)
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
    res.status(200).json(cliente);
});

// 3. Registrar un nuevo cliente (CREATE)
router.post('/', (req, res) => {
    const { nombre, telefono, email } = req.body;
    if (!nombre || !email) {
        return res.status(400).json({ error: "Nombre y email son obligatorios" });
    }
    const nuevoCliente = {
        id: clientes.length ? clientes[clientes.length - 1].id + 1 : 1,
        nombre,
        telefono: telefono || "Sin teléfono",
        email
    };
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// 4. Actualizar un cliente (UPDATE)
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ error: "Cliente no encontrado" });

    const { nombre, telefono, email } = req.body;
    clientes[index] = {
        ...clientes[index],
        nombre: nombre || clientes[index].nombre,
        telefono: telefono || clientes[index].telefono,
        email: email || clientes[index].email
    };
    res.status(200).json(clientes[index]);
});

// 5. Eliminar un cliente (DELETE)
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const existe = clientes.some(c => c.id === id);
    if (!existe) return res.status(404).json({ error: "Cliente no encontrado" });

    clientes = clientes.filter(c => c.id !== id);
    res.status(200).json({ mensaje: Cliente con ID ${id} eliminado exitosamente });
});

module.exports = router;