import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js'

describe("Test mocking pets/users y creación de adopciones", function (){

    it("generateMockUsers debe generar 50 usuarios", async function(){
        this.timeout(5000);
        const result = await request(app).get('/api/mocks/mockingusers?num=50');
        expect(result.status).to.equal(200);
        expect(result.body).to.have.property('status', 'success');
        expect(result.body.payload).to.be.an('array').that.has.lengthOf(50);
    });

    it("generateMockPets debe generar 100 mascotas", async function(){
        this.timeout(5000);
        const result = await request(app).get('/api/mocks/mockingpets?num=100');
        expect(result.status).to.equal(200);
        expect(result.body).to.have.property('status', 'success');
        expect(result.body.payload).to.be.an('array').that.has.lengthOf(100);
    });

    it("generateData debe generar e insertar adopciones entre 10 usuarios y 20 mascotas", async function () {
        this.timeout(5000);
        const result = await request(app)
            .post('/api/mocks/generateData')
            .send({
                users: 10,
                pets: 20
            })
            .set('Content-Type', 'application/json');

        expect(result.status).to.equal(200);
        expect(result.body).to.have.property('status', 'success');
        expect(result.body).to.have.property('message', '10 users and 20 pets inserted into the database');

        const adoptions = await request(app).get('/api/adoptions');
        expect(adoptions.body.payload).to.be.an('array').that.is.not.empty;
    });

})
