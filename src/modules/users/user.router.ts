import express, { Router } from 'express';
import { UsersController } from './user.controller';



const router = express.Router();

router.get(
    "/", 
    UsersController.getAllUsers
)


export const usersRouter: Router = router;