import express from 'express'
import * as dotenv from 'dotenv'
import sequelize from './config/database';
import Text from './models/text.model';
import textRoutes from './routes/text.route';

const app = express()

dotenv.config()

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/texts', textRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the text analyzer API')
})

const port = process.env.PORT || 3000

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

export default app
