const express = require('express');
const router = express.Router();

// Base de datos en memoria para clientes
let clientes = [
    { id: 1, nombre: "Carlos Perez", telefono: "3001234567", email: "carlos@correo.com" },
    { id: 2, nombre: "Laura Gomez", telefono: "3109876543", email: "laura@correo.com" }
];

// 1. GET: Obtener todos los clientes
router.get('/', (req, res) => {
    res.status(200).json(clientes);
});

// 2. GET by ID: Obtener un cliente por su ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);

    if (!cliente) {
        return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    res.status(200).json(cliente);
});

// 3. POST: Crear un nuevo cliente
router.post('/', (req, res) => {
    const { nombre, telefono, email } = req.body;

    if (!nombre || !telefono || !email) {
        return res.status(400).json({ mensaje: "Todos los campos (nombre, telefono, email) son obligatorios" });
    }

    const nuevoCliente = {
        id: clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1,
        nombre,
        telefono,
        email
    };

    clientes.push(nuevoCliente);
    res.status(201).json({ mensaje: "Cliente registrado exitosamente", cliente: nuevoCliente });
});

// 4. PUT: Actualizar un cliente existente
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, telefono, email } = req.body;

    const clienteIndex = clientes.findIndex(c => c.id === id);

    if (clienteIndex === -1) {
        return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    if (nombre) clientes[clienteIndex].nombre = nombre;
    if (telefono) clientes[clienteIndex].telefono = telefono;
    if (email) clientes[clienteIndex].email = email;

    res.status(200).json({ mensaje: "Cliente actualizado exitosamente", cliente: clientes[clienteIndex] });
});

// 5. DELETE: Eliminar un cliente por ID
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const clienteIndex = clientes.findIndex(c => c.id === id);

    if (clienteIndex === -1) {
        return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    clientes.splice(clienteIndex, 1);
    res.status(200).json({ mensaje: `Cliente con ID ${id} eliminado exitosamente` });
});

module.exports = router;