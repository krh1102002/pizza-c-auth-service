import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from '../entity/User';
import { UserData } from '../types';
import createHttpError from 'http-errors';
import { Roles } from '../constants';

export class UserService {
    constructor(private userRepository: Repository<User>) {}
    async create({ firstName, lastName, email, password }: UserData) {
        const user = await this.userRepository.findOne({
            where: { email: email },
        });

        if (user) {
            const error = createHttpError(400, 'email is already existed!!');
            throw error;
        }

        //hashing password
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        try {
            return await this.userRepository.save({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: Roles.CUSTOMER,
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            const error = createHttpError(
                500,
                'Failed to store the data in the database',
            );
            throw error;
        }
    }
}
