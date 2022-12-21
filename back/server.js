import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path'

// CONFIG
import { connectDB } from "./config/db.js";

//MIDDLEWARE
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

/* ROUTERS */
import userRouters from "./routes/userRouters.js";
import exerciseRoute from "./routes/exerciseRoutes.js"
import workoutRoute from "./routes/workoutRoutes.js"


dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))

app.use("/api/users", userRouters);
app.use("/api/exercises", exerciseRoute);
app.use("/api/workouts", workoutRoute)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
