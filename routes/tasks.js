// Import express from express library
import express from 'express';
// Importing the functions I made
import Task from '../models/task.js';
import sequelize from '../config/config.js';
// Declare router as the express router function
const router = express.Router();
//Get all tasks
router.get('/', async (req, res) => {
    try {
        await sequelize.authenticate(); // Check database connection
        await sequelize.sync(); // Sync models with the database
        // Fetch all tasks from the database
        const tasks = await Task.findAll();
        // Render the index view with the tasks
        res.render('index', { tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error); // Log the error for debugging
        // Send a meaningful error message as a response
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

router.post('/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    }
    catch(error){
        res.status(400).json({ error: error.message});
    }
});
export default router;