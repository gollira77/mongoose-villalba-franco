import express from "express"; 
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./src/config/database.js";
import userRoutes from "./src/routes/user.Routes.js";
import workoutRoutes from "./src/routes/workout.Routes.js";
import trainerRoutes from "./src/routes/trainer.Routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares 
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/trainers", trainerRoutes);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Servidor escuchando el el puerto ${PORT}`);
})
