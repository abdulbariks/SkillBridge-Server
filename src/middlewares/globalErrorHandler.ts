import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorCode: string | undefined;

  //  Prisma Validation Error
  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid or missing fields in request";
  }

  //  Prisma Known Request Error
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    errorCode = err.code;

    switch (err.code) {
      case "P2002":
        statusCode = 400;
        message = "Duplicate value. This record already exists.";
        break;

      case "P2003":
        statusCode = 400;
        message = "Foreign key constraint failed";
        break;

      case "P2025":
        statusCode = 404;
        message = "Requested record not found";
        break;

      default:
        message = "Database request error";
    }
  }

  //  Prisma Unknown Error
  else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    message = "Unknown database error occurred";
  }

  //  Prisma Initialization Error
  else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 500;
    message = "Failed to connect to database";
  }

  //  Normal JS Error (throw new Error)
  else if (err instanceof Error) {
    message = err.message;
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: {
      code: errorCode,
      ...(process.env.NODE_ENV === "development" && {
        stack: err.stack,
      }),
    },
  });
}

export default errorHandler;
