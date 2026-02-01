import { Router } from "express";
import { CategoryController } from "./category.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();

// POST /api/categorie

router.get("/", CategoryController.getCategories);
router.post("/", auth(UserRole.ADMIN), CategoryController.createCategory);

export const categoryRouter: Router = router;
