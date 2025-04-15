import { Request, Response } from 'express';
export class AuthController {
    register(req: Request, res: Response) {
        // res.status(201).send();  for the status code we write the beside code

        res.status(201).json(); //we use want to share json data from the server to the client then we use .json() function to it
    }
}
