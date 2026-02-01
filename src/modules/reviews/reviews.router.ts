import { Router } from "express";
import { ReviewController } from "./reviews.controller";
import auth, { UserRole } from "../../middlewares/auth";


const router = Router();

router.post("/", auth(UserRole.STUDENT) , ReviewController.createReview);

// Public route
router.get("/tutor/:tutorId", ReviewController.getReviewsByTutor);

export const ReviewRouter: Router = router;