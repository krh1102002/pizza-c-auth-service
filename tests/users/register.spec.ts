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
        it('should return valid json format:', async () => {
            const userData = {
                firstName: 'john',
                lastName: 'doe',
                email: 'john.doe@example.com',
                password: 'securePassword123',
            };
            // Act: call the function or method being tested
            await request(app).post('/auth/register').send(userData);

            // Assert: check the result
            // we were using toEqual instead of toBe because we got object as a response from the response that's why we have to equate it to

            // expect(res.headers['content-type']).toEqual(
            //     expect.stringContaining('json'),
            // );

            // we don't know whether it is property or not so that's why we can't use above method for that we have to use below method..

            expect(
                (res.headers as Record<string, string>)['content-type'],
            ).toEqual(expect.stringContaining('json'));
        });

        it('should persist the user in databases', async () => {
            // Arrange: set up the test case
            const userData = {
                firstName: 'john',
                lastName: 'doe',
                email: 'john.doe@example.com',
                password: 'securePassword123',
            };
            // Act: call the function or method being tested
            await request(app).post('/auth/register').send(userData);
        });
    });

    describe('given missing fields', () => {});
});
