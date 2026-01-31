import { prisma } from "../../lib/prisma";


const createBooking = async (payload: {
  studentId: string;
  tutorId: string;
  startTime: Date;
  endTime: Date;
}) => {
  const { studentId, tutorId, startTime, endTime } = payload;

  // Time validation
  if (startTime >= endTime) {
    throw new Error("Start time must be before end time");
  }

  // check tutor exists
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: tutorId },
  });

  if (!tutor) {
    throw new Error("Tutor not found");
  }

  const booking = await prisma.booking.create({
    data: {
      studentId,
      tutorId,
      startTime,
      endTime,
      status: "PENDING",
    },
  });

  return booking;
};

export const BookingService = {
  createBooking,
};
