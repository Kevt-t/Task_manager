import express from 'express';
import Task from '../models/task.js';

const router = express.Router();

// Render all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.render('tasks', { tasks });
    } catch (err) {
        res.status(500).send('Error loading tasks');
    }
});

// Render form for creating a new task
router.get('/', (req, res) => {
    res.render('new-task');
});

// Handle task creation
router.post('/', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        await Task.create({ title, description, status });
        res.redirect('/tasks');
    } catch (err) {
        res.status(500).send('Error creating task');
    }
});

// Handle task deletion
router.post('/delete/:id', async (req, res) => {
    try {
        await Task.destroy({ where: { id: req.params.id } });
        res.redirect('/tasks');
    } catch (err) {
        res.status(500).send('Error deleting task');
    }
});

export default router;