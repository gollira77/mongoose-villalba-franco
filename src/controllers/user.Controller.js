import User from "../models/User.js";
import Trainer from "../models/Trainer.js"; 
import Workout from "../models/Workout.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registrar un usuario
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email ya registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
};

const JWT_SECRET = process.env.JWT_SECRET;

// Login usuario
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    // ⚡ Token sin expiración
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en login", error: error.message });
  }
};

// Obtener perfil del usuario autenticado
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("trainer") // Trae datos del trainer asignado
      .populate("friends"); // Trae los amigos (si se usa)

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil", error: error.message });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) updates.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json({
      message: "Usuario actualizado correctamente",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    // Buscar y eliminar al usuario
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Eliminar todos los workouts asociados al usuario
    await Workout.deleteMany({ user: user._id });

    res.status(200).json({ message: "Usuario y workouts eliminados correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
  }
};

// Asignar un entrenador a un usuario
export const assignTrainerToUser = async (req, res) => {
  try {
    const { userId, trainerId } = req.params;

    // Buscar usuario y entrenador
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Entrenador no encontrado" });
    }

    // Asignar entrenador al usuario
    user.trainer = trainer._id;
    await user.save();

    res.status(200).json({
      message: "Entrenador asignado correctamente al usuario",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al asignar entrenador", error: error.message });
  }
};

// Agregar un amigo (relación N:M)
export const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Un usuario no puede agregarse a sí mismo
    if (userId === friendId) {
      return res.status(400).json({ message: "Un usuario no puede agregarse a sí mismo como amigo" });
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "Usuario o amigo no encontrado" });
    }

    // Evitar duplicados
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Este amigo ya está agregado" });
    }

    // Relación bidireccional
    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    res.status(200).json({
      message: "Amigo agregado correctamente",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar amigo", error: error.message });
  }
};
