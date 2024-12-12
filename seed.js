import Task from './models/task.js';
import { connectDB } from './config/config.js';

const seedDatabase = async () => {
    try {
        await connectDB(); // Connect to the database
        await Task.sync({ force: true }); // Drops the table and recreates it

        const sampleTasks = [
            { title: 'Complete Project Documentation', description: 'Finalize the project report and submit it.', status: 'pending' },
            { title: 'Team Meeting', description: 'Discuss project progress with the team.', status: 'completed' },
            { title: 'Fix Login Bug', description: 'Resolve the issue with user login functionality.', status: 'pending' },
            { title: 'Update Dependencies', description: 'Upgrade npm dependencies to latest versions.', status: 'completed' },
            { title: 'Prepare Presentation', description: 'Prepare slides for the upcoming demo.', status: 'pending' },
        ];

        await Task.bulkCreate(sampleTasks);

        console.log('Sample data inserted successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
