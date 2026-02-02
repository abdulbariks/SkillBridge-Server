import express, { Router } from 'express';
import { UsersController } from './user.controller';
import auth, { UserRole } from '../../middlewares/auth';



const router = express.Router();

router.get(
    "/", 
    UsersController.getAllUsers
)

router.get(
  "/me",
  auth(UserRole.ADMIN, UserRole.TUTOR, UserRole.STUDENT),
  UsersController.getMyProfile,
);


export const usersRouter: Router = router;