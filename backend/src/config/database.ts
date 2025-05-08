import { Sequelize } from 'sequelize';
import User from '../models/user.model';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'text_analyzer',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

export const initializeDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // Sync models
    await sequelize.sync({ force: false });
    console.log('Database synced');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
};

export default sequelize;
