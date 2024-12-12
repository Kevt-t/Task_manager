import express from 'express';
import Task from '../models/task.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll(); // Fetch all tasks from the database
    res.render('index', { tasks }); // Render the index view with tasks
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Add a new task
router.post('/tasks', async (req, res) => {
    try {
      const { title, description } = req.body;
      const task = await Task.create({ title, description }); // Save to database
      res.status(201).json(task); // Send the created task as a JSON response
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(400).json({ message: 'Error creating task', error: error.message });
    }
  });
  

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id; // Extract the task ID from the request parameters
    const deletedCount = await Task.destroy({ where: { id: taskId } }); // Delete the task

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found' }); // If no task was deleted
    }

    res.status(204).send(); // Respond with no content on successful deletion
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

// Update a task
router.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id; // Extract the task ID from the request parameters
    const { title, description, status } = req.body; // Extract fields from the request body

    const [updated] = await Task.update(
      { title, description, status },
      { where: { id: taskId } }
    );

    if (updated) {
      const updatedTask = await Task.findByPk(taskId); // Fetch the updated task
      res.status(200).json(updatedTask); // Respond with the updated task
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(400).json({ message: 'Error updating task', error: error.message });
  }
});

export default router;
