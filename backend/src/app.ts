import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerOptions';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve as any, swaggerUi.setup(swaggerSpec) as any);

app.use('/api/todos', todoRoutes);

app.get('/', (_req, res) => {
  res.send('ToDo API is running');
});

export default app;

if (require.main === module) {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
} 