import { prisma } from "../../lib/prisma";

interface CreateTutorProfileInput {
  bio?: string;
  hourlyRate: number;
  experience: number;
}

const createTutorProfile = async (
  userId: string,
  data: CreateTutorProfileInput,
  categories: string[],
) => {
  const { bio, hourlyRate, experience } = data;

  const existing = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (existing) {
    throw new Error("Tutor profile already exists");
  }

  const profile = await prisma.tutorProfile.create({
    data: {
      userId,
      bio: bio ?? null,
      hourlyRate,
      experience,
      categories: {
        connect: categories.map((id) => ({ id })),
      },
    },
    include: {
      user: true,
      categories: true,
    },
  });

  return profile;
};

export const TutorService = {
  createTutorProfile,
};
