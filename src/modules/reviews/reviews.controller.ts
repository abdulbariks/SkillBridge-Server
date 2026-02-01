import { Request, Response } from "express";
import { ReviewService } from "./reviews.service";


const createReview = async (req: Request, res: Response) => {
  try {
    const user = req.user as { id: string; role: string };

    //Only STUDENT can review
    if (user.role !== "STUDENT") {
      return res.status(403).json({
        success: false,
        message: "Only students can submit reviews",
      });
    }

    const { rating, comment, tutorId } = req.body;

    const review = await ReviewService.createReview({
      rating,
      comment,
      tutorId,
      studentId: user.id
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create review",
    });
  }
};

const getReviewsByTutor = async (req: Request, res: Response) => {
  try {
    const { tutorId } = req.params;

    const reviews = await ReviewService.getReviewsByTutor(tutorId as string);

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

export const ReviewController = {
  createReview,
  getReviewsByTutor,
};
