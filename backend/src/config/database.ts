import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  process.env.DB_NAME || 'text_analyzer',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Disable SQL query logging
  }
)

export const initializeDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    console.log('Database connected')

    // Force sync the database to create missing tables
    await sequelize.sync({ force: true })
    console.log('Database synced')
  } catch (err) {
    console.error('Unable to connect to the database:', err)
    process.exit(1) // Exit the process if the database connection fails
  }
}

export default sequelize
