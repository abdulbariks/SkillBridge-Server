import { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prisma";
import { TutorService } from "./tutor.service";

// CREATE TutorProfile
const createTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { bio, hourlyRate, experience, categories } = req.body;

    const result = await TutorService.createTutorProfile(
      user.id as string,
      { bio, hourlyRate, experience },
      categories,
    );

    res.status(201).json({
      success: true,
      message: "Tutor profile created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE TutorProfile

// GET all tutor profiles
const getAllTutors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutors = await TutorService.getAllTutors();
    res.status(200).json({
      success: true,
      data: tutors,
    });
  } catch (error) {
    next(error);
  }
};

// GET single tutor detail
const getTutorDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Tutor ID is required",
      });
    }

    const tutor = await TutorService.getTutorDetailById(id);

    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: tutor,
    });
  } catch (error) {
    next(error);
  }
};

export const TutorController = {
  createTutorProfile,
  getAllTutors,
  getTutorDetail,
};
