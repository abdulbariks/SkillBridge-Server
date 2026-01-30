import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();

// POST /api/categories
router.post("/", CategoryController.createCategory);

export const categoryRouter: Router = router;
