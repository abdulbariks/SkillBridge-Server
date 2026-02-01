import { prisma } from "../../lib/prisma";

const createReview = async (payload: {
  rating: number;
  comment?: string;
  studentId: string;
  tutorId: string;
}) => {
  if (payload.rating < 1 || payload.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  return prisma.review.create({
    data: payload,
  });
};

const getReviewsByTutor = async (tutorId: string) => {
  return prisma.review.findMany({
    where: { tutorId },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const ReviewService = {
  createReview,
  getReviewsByTutor,
};
