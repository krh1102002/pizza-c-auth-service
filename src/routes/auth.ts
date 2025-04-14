import express from 'express';
import { AuthController } from '../controllers/AuthController';

const router = express.Router();

const authController = new AuthController();

// if we won't use callback function inside the post method  then it will throw binding issues for that we have to pass req,res into the callback function and also to the register function also.

// router.post('/register', authController.register);

// below syntax will work current versions of node but we can write it like the above way also but now this way is being depricated as we were not using classes in node.js now so that's why binding issue occours
router.post('/register', (req, res) => {
    authController.register(req, res);
});

export default router;
