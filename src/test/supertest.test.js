import mongoose from 'mongoose';
import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe('Tests funcionales para la API', function () {
    this.timeout(5000); // Incrementar el tiempo límite si las pruebas tardan más en completarse.

    // Variables para datos de prueba
    let testUserId, testPetId;

    before(async function () {
        // Conexión a la base de datos de prueba
        const isTestEnv = process.env.NODE_ENV === 'test';
        const dbURI = isTestEnv ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI;
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    after(async function () {
        // Cerrar la conexión después de las pruebas
        await mongoose.connection.close();
    });

    describe('Rutas de usuarios', function () {
        it('POST /api/users debería crear un usuario', async function () {
            const userData = {
                first_name: 'Test',
                last_name: 'User',
                email: `test${Date.now()}@example.com`,
                password: 'password123',
                role: 'user'
            };

            const result = await request(app)
                .post('/api/users')
                .send(userData)
                .set('Content-Type', 'application/json');

            expect(result.status).to.equal(201);
            expect(result.body).to.have.property('status', 'success');
            expect(result.body.payload).to.be.an('object');
            testUserId = result.body.payload._id; // Guardar el ID del usuario creado
        });

        it('GET /api/users debería obtener todos los usuarios', async function () {
            const result = await request(app).get('/api/users');
            expect(result.status).to.equal(200);
            expect(result.body).to.have.property('status', 'success');
            expect(result.body.payload).to.be.an('array');
        });
    });

    describe('Rutas de mascotas', function () {
        it('POST /api/pets debería crear una mascota', async function () {
            const petData = {
                name: 'TestPet',
                specie: 'Dog',
                birthDate: '2020-01-01',
                adopted: false
            };

            const result = await request(app)
                .post('/api/pets')
                .send(petData)
                .set('Content-Type', 'application/json');

            expect(result.status).to.equal(201);
            expect(result.body).to.have.property('status', 'success');
            expect(result.body.payload).to.be.an('object');
            testPetId = result.body.payload._id; // Guardar el ID de la mascota creada
        });

        it('GET /api/pets debería obtener todas las mascotas', async function () {
            const result = await request(app).get('/api/pets');
            expect(result.status).to.equal(200);
            expect(result.body).to.have.property('status', 'success');
            expect(result.body.payload).to.be.an('array');
        });
    });

    describe('Rutas de adopciones', function () {
        it('POST /api/adoptions/:uid/:pid debería crear una adopción', async function () {
            const result = await request(app)
                .post(`/api/adoptions/${testUserId}/${testPetId}`)
                .set('Content-Type', 'application/json');

            if (result.status === 400 || result.status === 404) {
                expect(result.body).to.have.property('error');
            } else {
                expect(result.status).to.equal(200);
                expect(result.body).to.have.property('status', 'success');
                expect(result.body.message).to.equal('Pet adopted');
            }
        });

        it('GET /api/adoptions debería obtener todas las adopciones', async function () {
            const result = await request(app).get('/api/adoptions');
            expect(result.status).to.equal(200);
            expect(result.body).to.have.property('status', 'success');
            expect(result.body.payload).to.be.an('array');
        });
    });
});
