import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { handleValidationErrors } from "../middlewares/validationMiddleware.js";
import {createWorkout, getWorkouts, getWorkoutById, updateWorkout, deleteWorkout,} from "../controllers/workout.Controller.js";
import {createWorkoutValidator, updateWorkoutValidator,} from "../validators/workoutValidator.js";

const router = Router();

// Crear un workout (solo usuario autenticado)
router.post("/",authMiddleware, createWorkoutValidator, handleValidationErrors, createWorkout);

// Obtener todos los workouts del usuario autenticado
router.get("/", authMiddleware, getWorkouts);

// Obtener un workout específico por ID
router.get("/:id", authMiddleware, getWorkoutById);

// Actualizar workout por ID
router.put("/:id", authMiddleware, updateWorkoutValidator, handleValidationErrors, updateWorkout);

// Eliminar workout por ID
router.delete("/:id", authMiddleware, deleteWorkout);

export default router;
