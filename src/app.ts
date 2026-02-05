import express, { Application } from "express";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import errorHandler from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import { bookingRouter } from "./modules/booking/booking.router";
import { usersRouter } from "./modules/users/user.router";
import { tutorRouter } from "./modules/tutor/tutor.router";
import { categoryRouter } from "./modules/categories/category.router";
import { ReviewRouter } from "./modules/reviews/reviews.router";

const app: Application = express();

const allowedOrigins = [
  process.env.FRONTEND_APP_URL, // Production frontend URL
  process.env.BETTER_AUTH_URL,
  "http://localhost:5000",
  "http://localhost:4000",
  "http://localhost:3000",
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);

console.log("BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/v1/api/bookings", bookingRouter);
app.use("/v1/api/users", usersRouter);
app.use("/v1/api/tutors", tutorRouter);
app.use("/v1/api/categories", categoryRouter);
app.use("/v1/api/reviews", ReviewRouter);

app.get("/", (req, res) => {
  res.send("Skill Bridge!");
});
app.use(notFound);
app.use(errorHandler);

export default app;
