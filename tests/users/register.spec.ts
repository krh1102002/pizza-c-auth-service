// import { request } from 'http';
import app from './../../src/app';
import request from 'supertest';
describe('/auth/register', () => {
    describe('Given all fields', () => {
        it('should return 201 as a status code', async () => {
            // for TDD(test driven development) we will use the following test cases:
            // we have to follow AAA structure
            // Arrange: set up the test case
            const userData = {
                firstName: 'john',
                lastName: 'doe',
                email: 'john.doe@example.com',
                password: 'securePassword123',
            };
            // Act: call the function or method being tested
            const res = await request(app)
                .post('/auth/register')
                .send(userData);

            // Assert: check the result
            expect(res.statusCode).toBe(201);
        });
    });

    describe('given missing fields', () => {});
});
