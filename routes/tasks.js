import express from 'express';
import Task from '../models/task.js';

const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const newTask = await Task.create({ title, description, status });
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const [updated] = await Task.update(
            { title, description, status },
            { where: { id: req.params.id } }
        );
        if (updated) {
            const updatedTask = await Task.findByPk(req.params.id);
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Task.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
