import express, { Router } from 'express';
import { BookingController } from './booking.controller';
import auth, { UserRole } from '../../middlewares/auth';


const router = express.Router();

router.post("/", auth(UserRole.STUDENT), BookingController.createBooking);



export const bookingRouter: Router = router;