const { describe, it } = require('mocha');
const request = require('supertest');
const assert = require('assert');
const api = require('./api');

describe('API Suite test', () => {
    describe('/contact', () => {
        it('Should request the contact page and return HTTP Status 200', async () => {
            const response = await request(api).get('/contact').expect(200);
            assert.deepStrictEqual(response.text, 'contact us page');
        });
    });

    describe('/hi', () => {
        it('Should request an inexistent route /hi and redirect to /hello', async () => {
            const response = await request(api).get('/hi').expect(200);
            assert.deepStrictEqual(response.text, 'Hello World');
        });
    });

    describe('/hi', () => {
        it('Should login successfully on the login route and return HTTP Status 200', async () => {
            const response = await request(api)
                .post('/login')
                .send({ username: 'Lucas', password: '123456' })
                .expect(200);
            assert.deepStrictEqual(response.text, 'Logging has succeeded!');
        });

        it('Should not login successfully and return HTTP Status 401', async () => {
            const response = await request(api)
                .post('/login')
                .send({ username: 'Joao', password: '654321' })
                .expect(200);
            assert.ok(response.unauthorized);
            assert.deepStrictEqual(response.text, 'Logging failed!');
        });
    });
});