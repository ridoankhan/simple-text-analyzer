import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME || 'text_analyzer',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
)

export const initializeDatabase = async (): Promise<any> => {
  try {
    await sequelize.authenticate()
    console.log('Database connected')

    // Sync models here if needed
    console.log('Database synced')
  } catch (err) {
    console.error('Unable to connect to the database:', err)
    process.exit(1)
  }
}

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }) // Use `alter: true` to update the schema
    console.log('Database synced')
  } catch (error) {
    console.error('Error syncing database:', error)
  }
}

syncDatabase()

export default sequelize
