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
// export const updateTutorProfile = async (req: Request, res: Response) => {
//   try {
//     const { bio, hourlyRate, experience, isVerified, categories } = req.body;
//     const userId = req.user.id;

//     const profile = await prisma.tutorProfile.update({
//       where: { userId },
//       data: {
//         bio,
//         hourlyRate,
//         experience,
//         isVerified,
//         categories: categories
//           ? { set: categories.map((id: string) => ({ id })) } // replace categories
//           : undefined,
//       },
//       include: { categories: true, user: true },
//     });

//     res.json({ message: "Profile updated", profile });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// GET all tutor profiles
const getAllTutors = async (req: Request, res: Response) => {
  try {
    const tutors = await prisma.tutorProfile.findMany({
      include: { user: true, categories: true, reviews: true },
    });
    res.json(tutors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET single tutor detail
// export const getTutorDetail = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const tutor = await prisma.tutorProfile.findUnique({
//       where: { id },
//       include: { user: true, categories: true, reviews: true, bookings: true },
//     });

//     if (!tutor) return res.status(404).json({ message: "Tutor not found" });

//     res.json(tutor);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const TutorController = {
  createTutorProfile,
  getAllTutors,
};
