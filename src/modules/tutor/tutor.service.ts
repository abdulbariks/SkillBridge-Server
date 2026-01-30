import { prisma } from "../../lib/prisma";

interface CreateTutorProfileInput {
  bio?: string;
  hourlyRate: number;
  experience: number;
}

interface UpdateTutorProfileInput {
  bio?: string;
  hourlyRate?: number;
  experience?: number;
  isVerified?: boolean;
  categories?: string[];
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

const getAllTutors = async () => {
  const tutors = await prisma.tutorProfile.findMany({
    include: {
      user: true,
      categories: true,
      reviews: true,
    },
  });

  return tutors;
};

const getTutorDetailById = async (tutorId: string) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: tutorId },
    include: {
      user: true,
      categories: true,
      reviews: true,
      bookings: true,
    },
  });

  return tutor;
};

const updateTutorProfile = async (
  userId: string,
  data: UpdateTutorProfileInput,
) => {
  const { bio, hourlyRate, experience, isVerified, categories } = data;

  // check if profile exists
  const existingProfile = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (!existingProfile) {
    throw new Error("Tutor profile not found");
  }

  const updatedProfile = await prisma.tutorProfile.update({
    where: { userId },
    data: {
      bio,
      hourlyRate,
      experience,
      isVerified,
      ...(categories && {
        categories: {
          set: categories.map((id) => ({ id })),
        },
      }),
    },
    include: {
      user: true,
      categories: true,
    },
  });

  return updatedProfile;
};

export const TutorService = {
  createTutorProfile,
  getAllTutors,
  getTutorDetailById,
  updateTutorProfile,
};
