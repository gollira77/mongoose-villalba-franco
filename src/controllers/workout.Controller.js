import Workout from "../models/Workout.js";
import User from "../models/User.js";

// Crear un workout (solo usuario autenticado)
export const createWorkout = async (req, res) => {
  try {
    const { title, description, exercises } = req.body;

    const workout = new Workout({
      title,
      description,
      exercises,
      user: req.user.id, // Asigna el workout al usuario logueado
    });

    await workout.save();

    res.status(201).json({
      message: "Workout creado correctamente",
      workout,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear workout",
      error: error.message,
    });
  }
};

// Obtener todos los workouts del usuario autenticado
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener workouts",
      error: error.message,
    });
  }
};

// Obtener un workout específico por ID (solo si pertenece al usuario)
export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout no encontrado" });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener workout",
      error: error.message,
    });
  }
};

// Actualizar workout por ID (solo si pertenece al usuario)
export const updateWorkout = async (req, res) => {
  try {
    const { title, description, exercises } = req.body;

    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, exercises },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ message: "Workout no encontrado" });
    }

    res.status(200).json({
      message: "Workout actualizado correctamente",
      workout,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar workout",
      error: error.message,
    });
  }
};

// Eliminar workout (solo si pertenece al usuario)
export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout no encontrado" });
    }

    res.status(200).json({ message: "Workout eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar workout",
      error: error.message,
    });
  }
};
