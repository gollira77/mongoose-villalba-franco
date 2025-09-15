import { Router } from "express";
import {createTrainer, getTrainers, getTrainerById, updateTrainer, deleteTrainer, addUserToTrainer} from "../controllers/trainer.Controller.js";
import { createTrainerValidator, updateTrainerValidator } from "../validators/trainerValidators.js";
import { validationResult } from "express-validator";

const router = Router();

// Middleware para manejar errores de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// CRUD trainers
router.post("/", createTrainerValidator, validate, createTrainer);
router.get("/", getTrainers);
router.get("/:id", getTrainerById);
router.put("/:id", updateTrainerValidator, validate, updateTrainer);
router.delete("/:id", deleteTrainer);

// Endpoint especial para asignar un usuario a un trainer
router.post("/:trainerId/addUser/:userId", addUserToTrainer);

export default router;
