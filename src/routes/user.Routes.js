import { Router } from "express";
import { registerUser, loginUser, getProfile, updateUser, deleteUser, assignTrainerToUser, addFriend } from "../controllers/user.Controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { registerValidation, loginValidation } from "../validators/userValidators.js";
import { validationResult } from "express-validator";

const router = Router();

// Middleware para manejar errores de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

// Asignar un trainer a un usuario
// PUT /api/users/:userId/trainer/:trainerId
router.put("/:userId/trainer/:trainerId", authMiddleware, assignTrainerToUser);

// Agregar un amigo a un usuario (relación N:M)
// PUT /api/users/:userId/friends/:friendId
router.put("/:userId/friends/:friendId", authMiddleware, addFriend);

export default router;
