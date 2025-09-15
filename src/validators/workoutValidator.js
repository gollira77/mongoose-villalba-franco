import { body } from "express-validator";

// Validación para crear un workout
export const createWorkoutValidator = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El título debe tener al menos 3 caracteres"),

  body("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 5 })
    .withMessage("La descripción debe tener al menos 5 caracteres"),

  body("duration")
    .notEmpty()
    .withMessage("La duración es obligatoria")
    .isNumeric()
    .withMessage("La duración debe ser un número en minutos"),
];

// Validación para actualizar un workout
export const updateWorkoutValidator = [
  body("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("El título debe tener al menos 3 caracteres"),

  body("description")
    .optional()
    .isLength({ min: 5 })
    .withMessage("La descripción debe tener al menos 5 caracteres"),

  body("duration")
    .optional()
    .isNumeric()
    .withMessage("La duración debe ser un número en minutos"),
];
