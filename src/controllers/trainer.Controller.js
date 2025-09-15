import Trainer from "../models/Trainer.js";
import User from "../models/User.js";

export const createTrainer = async (req, res) => {
  try {
    const { name, email, specialty } = req.body;
    const trainer = new Trainer({ name, email, specialty });
    await trainer.save();
    res.status(201).json({ message: "Entrenador creado correctamente", trainer });
  } catch (error) {
    res.status(500).json({ message: "Error al crear entrenador", error: error.message });
  }
};

// Obtener todos los trainers
export const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().populate("users");
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener entrenadores", error: error.message });
  }
};

// Obtener trainer por ID
export const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id).populate("users");
    if (!trainer) return res.status(404).json({ message: "Entrenador no encontrado" });
    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener entrenador", error: error.message });
  }
};

// Actualizar trainer
export const updateTrainer = async (req, res) => {
  try {
    const { name, email, specialty } = req.body;
    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      { name, email, specialty },
      { new: true }
    );
    if (!trainer) return res.status(404).json({ message: "Entrenador no encontrado" });
    res.status(200).json({ message: "Entrenador actualizado correctamente", trainer });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar entrenador", error: error.message });
  }
};

// Eliminar trainer
export const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ message: "Entrenador no encontrado" });
    res.status(200).json({ message: "Entrenador eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar entrenador", error: error.message });
  }
};

// Agregar un usuario a un trainer (relación N:M)
export const addUserToTrainer = async (req, res) => {
  try {
    const { trainerId, userId } = req.params;

    const trainer = await Trainer.findById(trainerId);
    if (!trainer) return res.status(404).json({ message: "Entrenador no encontrado" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (!trainer.users.includes(userId)) {
      trainer.users.push(userId);
      await trainer.save();
    }

    user.trainer = trainerId;
    await user.save();

    res.status(200).json({ message: "Usuario asignado al entrenador correctamente", trainer });
  } catch (error) {
    res.status(500).json({ message: "Error al asignar usuario al entrenador", error: error.message });
  }
};