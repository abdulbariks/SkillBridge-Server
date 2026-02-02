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

router.patch(
  "/me",
  auth(UserRole.ADMIN, UserRole.TUTOR, UserRole.STUDENT),
  UsersController.updateMyProfile,
);

router.delete(
  "/me",
  auth(UserRole.ADMIN, UserRole.TUTOR, UserRole.STUDENT),
  UsersController.deleteMyAccount,
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN),
  UsersController.adminDeleteUser,
);


export const usersRouter: Router = router;