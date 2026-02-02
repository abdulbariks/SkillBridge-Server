import { Request, Response, NextFunction } from "express";
import { UsersService } from "./user.service";




const getAllUsers = async (req: Request, res: Response) => {
    try {
         const result = await UsersService.getAllUsers({})
        res.status(200).json(result)
    } catch (e) {
        res.status(400).json({
            error: "Booking creation failed",
            details: e
        })
    }
}


const getMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await UsersService.getMyProfile(req.user.id);

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


export const UsersController = {
   getAllUsers,
   getMyProfile

}