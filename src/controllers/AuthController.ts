import { Response } from 'express';
import { RegisterUserInterface } from '../types';
import { UserService } from './../service/UserService';

export class AuthController {
    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async register(req: RegisterUserInterface, res: Response) {
        // res.status(201).send();  for the status code we write the beside code

        const { firstName, lastName, email, password } = req.body;
        this.userService.create({ firstName, lastName, email, password });
        res.status(201).json(); //we use want to share json data from the server to the client then we use .json() function to it
    }
}
