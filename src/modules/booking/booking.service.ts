import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/auth";


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

//  ROLE-BASED GET BOOKINGS
const getBookings = async (user: any) => {
  const { id, role } = user;

  // ADMIN all bookings
  if (role === UserRole.ADMIN) {
    return prisma.booking.findMany({
      include: {
        student: true,
        tutor: {
          include: { user: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  // STUDENT own bookings
  if (role === UserRole.STUDENT) {
    return prisma.booking.findMany({
      where: {
        studentId: id,
      },
      include: {
        tutor: {
          include: { user: true},
         
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  // TUTOR bookings related to his tutor profile
  if (role === UserRole.TUTOR) {
    const tutorProfile = await prisma.tutorProfile.findUnique({
      where: { userId: id },
    });

    if (!tutorProfile) {
      throw new Error("Tutor profile not found");
    }

    return prisma.booking.findMany({
      where: {
        tutorId: tutorProfile.id,
      },
      include: {
        student: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  throw new Error("Invalid role");
};

export const BookingService = {
  createBooking,
  getBookings
};
