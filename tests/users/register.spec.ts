import { DataSource } from 'typeorm';
import app from './../../src/app';
import request from 'supertest';
import { AppDataSource } from './../../src/config/data-source';
import { User } from '../../src/entity/User';
import { Roles } from '../../src/constants';

describe('POST /auth/register', () => {
    let connection: DataSource;

    // this are the hooks which are provided by the jest
    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        //truncate Tables....
        // await truncateTables(connection);    if we do truncate table then when we add new column inside a table then it won't synchronize it properly
        // solution:------
        await connection.dropDatabase();
        await connection.synchronize();
    });

    // it will run after all the test is getting executed
    afterAll(async () => {
        await connection.destroy();
    });

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
            const res = await request(app)
                .post('/auth/register')
                .send(userData);

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

            //assert
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(1);
            expect(users[0].firstName).toBe(userData.firstName);
            expect(users[0].lastName).toBe(userData.lastName);
            expect(users[0].email).toBe(userData.email);
        });
        it('should return an id of the created user', async () => {
            // Arrange
            const userData = {
                firstName: 'john',
                lastName: 'doe',
                email: 'john.doe@example.com',
                password: 'securePassword123',
            };
            // Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);

            // assert
            expect(response.body).toHaveProperty('id');
            const repository = connection.getRepository(User);
            const users = await repository.find();
            expect((response.body as Record<string, string>).id).toBe(
                users[0].id,
            );
        });
        it('should assign a customer role', async () => {
            // Arrange
            const userData = {
                firstName: 'john',
                lastName: 'doe',
                email: 'john.doe@example.com',
                password: 'securePassword123',
            };
            // Act
            await request(app).post('/auth/register').send(userData);

            // assert
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users[0]).toHaveProperty('role');
            expect(users[0].role).toBe(Roles.CUSTOMER);
        });
    });

    it('should store the hashed password in the database', async () => {
        // Arrange
        const userData = {
            firstName: 'john',
            lastName: 'doe',
            email: 'john.doe@example.com',
            password: 'securePassword123',
        };

        // Act
        await request(app).post('/auth/register').send(userData);

        // assert
        const userRepository = connection.getRepository(User);
        const users = await userRepository.find();
        expect(users[0].password).not.toBe(userData.password);
        expect(users[0].password).toHaveLength(60);
        expect(users[0].password).toMatch(/^\$2b\$\d+\$/);
    });

    it('should return 400 status code if email is already exist', async () => {
        // Arrange
        const userData = {
            firstName: 'john',
            lastName: 'doe',
            email: 'john.doe@example.com',
            password: 'securePassword123',
        };

        const userRepository = connection.getRepository(User);
        await userRepository.save({ ...userData, role: Roles.CUSTOMER });

        // Act
        const response = await request(app)
            .post('/auth/register')
            .send(userData);

        //Assert
        const users = await userRepository.find();
        expect(response.statusCode).toBe(400);
        expect(users).toHaveLength(1);
    });
    describe('given missing fields', () => {});
});
