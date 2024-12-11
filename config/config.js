import { Sequelize } from "sequelize";
import 'dotenv/config';

const sequelizeConnection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

const connectDB = async () => {
    try {
        await sequelizeConnection.authenticate();
        console.log("Database Connected");
    } catch (err) {
        console.error("Unable to connect to the database:", err);
    }
};

export { connectDB }; // Export the connectDB function
export default sequelizeConnection; // Keep the default export