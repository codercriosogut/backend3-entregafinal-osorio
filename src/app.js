import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import dotenv from 'dotenv';
import configureSwagger  from './utils/swaggerConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT

const isTestEnv = process.env.NODE_ENV === 'test';
const dbURI = isTestEnv ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Conexión a MongoDB establecida en ${isTestEnv ? 'modo test' : 'producción'}`);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    });

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
configureSwagger (app);
export default app;
