import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { TutorController } from "./tutor.controller";

const router = Router();

// Public routes
router.get("/", TutorController.getAllTutors);
router.get("/:id", TutorController.getTutorDetail);

// Protected routes (Tutor only)
router.post(
  "/",
  auth(UserRole.STUDENT),
  TutorController.createTutorProfile,
);
// router.put("/", updateTutorProfile);

export const tutorRouter: Router = router;
