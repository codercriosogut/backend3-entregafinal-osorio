import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe("Test del endpoint POST /api/users", function () {
    this.timeout(5000);

    it("Debería crear un usuario exitosamente", async function () {
        const userData = {
            first_name: "Test",
            last_name: "User",
            email: `test${Date.now()}@example.com`,
            password: "coder123",
            role: "admin"
        };

        const result = await request(app)
            .post('/api/users')
            .send(userData)
            .set('Content-Type', 'application/json');

        expect(result.status).to.equal(201);
        expect(result.body).to.have.property('status', 'success');
        expect(result.body.message).to.equal("Usuario creado exitosamente");
        expect(result.body.payload).to.be.an('object');
        expect(result.body.payload).to.have.property('_id');
    });

    it("Debería devolver error si falta un campo requerido", async function () {
        const incompleteUserData = {
            first_name: "Test",
            last_name: "User",
            email: ""
        };

        const result = await request(app)
            .post('/api/users')
            .send(incompleteUserData)
            .set('Content-Type', 'application/json');

        expect(result.status).to.equal(400);
        expect(result.body).to.have.property('status', 'error');
        expect(result.body).to.have.property('error');
    });
});
