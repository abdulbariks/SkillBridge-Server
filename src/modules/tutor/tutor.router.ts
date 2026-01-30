import { Router } from "express";
// import {
//   createTutorProfile,
// //   updateTutorProfile,
// //   getAllTutors,
// //   getTutorDetail,
// } from "./tutor.controller";
import auth, { UserRole } from "../../middlewares/auth";
import { TutorController } from "./tutor.controller";

const router = Router();

// Public routes
router.get("/", TutorController.getAllTutors);
// router.get("/:id", getTutorDetail);

// Protected routes (Tutor only)
router.post(
  "/",
  auth(UserRole.STUDENT, UserRole.TUTOR),
  TutorController.createTutorProfile,
);
// router.put("/", updateTutorProfile);

export const tutorRouter: Router = router;
