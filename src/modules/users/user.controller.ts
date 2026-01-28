import { Request, Response } from "express";
import { UsersService } from "./user.service";




const getAllUsers = async (req: Request, res: Response) => {
    try {
         const result = await UsersService.getAllUsers({})
        res.status(201).json(result)
    } catch (e) {
        res.status(400).json({
            error: "Booking creation failed",
            details: e
        })
    }
}


export const UsersController = {
   getAllUsers

}