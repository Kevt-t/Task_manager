import express from 'express';
import taskRoutes from './routes/tasks.js';

const app = express();

app.use(express.json());
app.use('/tasks', taskRoutes);

const PORT = process.env.port ||3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});