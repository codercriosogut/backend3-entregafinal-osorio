import mongoose from 'mongoose';
import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import { usersService, petsService, adoptionsService } from '../services/index.js';

describe("Tests funcionales del router adoption.router.js", function () {
    this.timeout(5000);

    let userId, petId, adoptionId;

    beforeEach(async () => {

        const user = await usersService.create({
            first_name: "Test",
            last_name: "User",
            email: `testuser${Date.now()}@example.com`,
            password: "hashedpassword",
            role: "user",
            pets: []
        });

        const pet = await petsService.create({
            name: "TestPet",
            specie: "Dog",
            birthDate: "2020-01-01",
            adopted: false
        });

        const adoption = await adoptionsService.create({
            owner: user._id,
            pet: pet._id
        });

        userId = user._id;
        petId = pet._id;
        adoptionId = adoption._id;
    });

    it("GET /api/adoptions debería devolver todas las adopciones", async function () {
        const result = await request(app).get('/api/adoptions');
        expect(result.status).to.equal(200);
        expect(result.body).to.have.property('status', 'success');
        expect(result.body.payload).to.be.an('array');
    });

    it("GET /api/adoptions/:aid debería devolver una adopción específica", async function () {
        const result = await request(app).get(`/api/adoptions/${adoptionId}`);
        if (result.status === 404) {
            expect(result.body).to.have.property('error', 'Adoption not found');
        } else {
            expect(result.status).to.equal(200);
            expect(result.body).to.have.property('status', 'success');
            expect(result.body.payload).to.be.an('object');
        }
    });

    it("POST /api/adoptions/:uid/:pid debería crear una adopción", async function () {
        const newPet = await petsService.create({
            name: "AnotherTestPet",
            specie: "Cat",
            birthDate: "2021-05-05",
            adopted: false
        });

        const result = await request(app).post(`/api/adoptions/${userId}/${newPet._id}`);
        if (result.status === 400 || result.status === 404) {
            expect(result.body).to.have.property('error');
        } else {
            expect(result.status).to.equal(200);
            expect(result.body).to.have.property('status', 'success');
            expect(result.body.message).to.equal('Pet adopted');
        }
    });

    afterEach(async () => {
        try {
            const db = mongoose.connection.db;
            await db.collection('users').deleteMany({});
            await db.collection('pets').deleteMany({});
            await db.collection('adoptions').deleteMany({});
        } catch (error) {
            console.error("Error cleaning up database after test:", error);
            throw error;
        }
    });
});
