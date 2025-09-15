import { body } from "express-validator";

// Validación para crear un workout
export const createWorkoutValidator = [
  body("title").notEmpty().withMessage("El título es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
  body("duration")
    .optional()
    .isNumeric()
    .withMessage("La duración debe ser un número"),
];

// Validación para actualizar un workout
export const updateWorkoutValidator = [
  body("title").optional().notEmpty().withMessage("El título no puede estar vacío"),
  body("description").optional().notEmpty().withMessage("La descripción no puede estar vacía"),
  body("duration").optional().isNumeric().withMessage("La duración debe ser un número"),
];
