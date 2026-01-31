import { Request, Response } from "express";
import { BookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }
    const studentId = req.user.id;
    const { tutorId, startTime, endTime } = req.body;

    const booking = await BookingService.createBooking({
      studentId,
      tutorId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });

    res.status(201).json({
      success: true,
      message: "Booking request created successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const BookingController = {
  createBooking,
};
