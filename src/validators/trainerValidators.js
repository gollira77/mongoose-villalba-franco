import { body } from "express-validator";

// Validación para crear un trainer
export const createTrainerValidator = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Email inválido"),

  body("specialty")
    .notEmpty()
    .withMessage("La especialidad es obligatoria")
    .isLength({ min: 3 })
    .withMessage("La especialidad debe tener al menos 3 caracteres"),
];

// Validación para actualizar un trainer
export const updateTrainerValidator = [
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Email inválido"),

  body("specialty")
    .optional()
    .isLength({ min: 3 })
    .withMessage("La especialidad debe tener al menos 3 caracteres"),
];
