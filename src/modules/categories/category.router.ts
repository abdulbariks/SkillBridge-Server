import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();

// POST /api/categorie

router.get("/", CategoryController.getCategories);
router.post("/", CategoryController.createCategory);

export const categoryRouter: Router = router;
