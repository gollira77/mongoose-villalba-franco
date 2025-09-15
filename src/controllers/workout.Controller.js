import { Workout } from "../models/Workout.js";

// Crear workout
export const createWorkout = async (req, res) => {
  try {
    const { title, description, duration } = req.body;

    const workout = new Workout({
      title,
      description,
      duration,
      user: req.user.id, // el usuario autenticado
    });

    await workout.save();
    res.status(201).json({
      message: "Workout creado correctamente",
      workout,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear workout",
      error,
    });
  }
};

// Obtener todos los workouts del usuario autenticado
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener workouts",
      error,
    });
  }
};

// Obtener un workout por ID (solo si pertenece al usuario)
export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout no encontrado" });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener workout",
      error,
    });
  }
};

// Actualizar workout (solo si pertenece al usuario)
export const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ message: "Workout no encontrado" });
    }

    res.json({
      message: "Workout actualizado correctamente",
      workout,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar workout",
      error,
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

    res.json({ message: "Workout eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar workout",
      error,
    });
  }
};
