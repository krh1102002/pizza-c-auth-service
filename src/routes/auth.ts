import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { UserService } from '../service/UserService';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import logger from '../config/logger';

const router = express.Router();

//when we were passing it inside the authcontroller then that is called as dependency injection(jo bhi dependechy chahiye woh apan constructor se lete hai)
// use: at the time of testing we don't need to pass the whole user service

// there is one library called inversify for dependency injections we don't need to create manually.

const userRepository = AppDataSource.getRepository(User);
const userServices = new UserService(userRepository);
const authController = new AuthController(userServices, logger);

// if we won't use callback function inside the post method  then it will throw binding issues for that we have to pass req,res into the callback function and also to the register function also.

// router.post('/register', authController.register);

// below syntax will work current versions of node but we can write it like the above way also but now this way is being depricated as we were not using classes in node.js now so that's why binding issue occours
router.post('/register', (req, res, next) => {
    authController.register(req, res, next);
});

export default router;
