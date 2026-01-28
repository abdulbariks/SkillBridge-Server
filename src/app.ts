import express, { Application } from "express";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import errorHandler from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import { bookingRouter } from "./modules/booking/booking.router";
import { usersRouter } from "./modules/users/user.router";

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3001", // client side url
    credentials: true
}))

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/bookings", bookingRouter);
app.use("/users", usersRouter);


app.get("/", (req, res) => {
    res.send("Skill Bridge!");
});
app.use(notFound)
app.use(errorHandler)

export default app;