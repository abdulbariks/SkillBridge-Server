import { Request, Response } from "express";
import { BookingService } from "./booking.service";



const createBooking = async (req: Request, res: Response) => {
    try {
         const result = await BookingService.createBooking()
        res.status(201).json(result)
    } catch (e) {
        res.status(400).json({
            error: "Booking creation failed",
            details: e
        })
    }
}


export const BookingController = {
    createBooking

}