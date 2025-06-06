import { NextFunction, Response } from 'express';
import { RegisterUserInterface } from '../types';
import { UserService } from './../service/UserService';
import { Logger } from 'winston';

export class AuthController {
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {
        this.userService = userService;
    }

    async register(
        req: RegisterUserInterface,
        res: Response,
        next: NextFunction,
    ) {
        // res.status(201).send();  for the status code we write the beside code

        const { firstName, lastName, email, password } = req.body;
        this.logger.debug('New request to register a user: ', {
            firstName,
            lastName,
            email,
            password: '****',
        });
        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            });
            this.logger.info('User has been registered', { id: user.id });
            res.status(201).json({ id: user.id }); //we use want to share json data from the server to the client then we use .json() function to it
        } catch (error) {
            next(error);
            return;
        }
    }
}
