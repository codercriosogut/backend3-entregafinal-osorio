import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import dotenv from 'dotenv';
import configureSwagger from './utils/swaggerConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT

const uri = process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_TEST_URI
    : process.env.MONGODB_URI;

console.log('NODE_ENV:', process.env.NODE_ENV);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Conexión a MongoDB establecida en ${process.env.NODE_ENV}`))
    .catch(err => console.error('Error conectándose a MongoDB:', err));


app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

configureSwagger(app);
export default app;
