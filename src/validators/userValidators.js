import { body, param } from "express-validator";

export const registerValidation = [
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("email").isEmail().withMessage("Email inválido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

export const updateUserValidation = [
  param("id").isMongoId().withMessage("ID de usuario inválido"),
  body("name").optional().notEmpty().withMessage("El nombre no puede estar vacío"),
  body("email").optional().isEmail().withMessage("Email inválido"),
  body("password").optional().isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const deleteUserValidation = [
  param("id").isMongoId().withMessage("ID de usuario inválido"),
];