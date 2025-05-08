import Paciente from "../models/paciente.model.js";
export const crearPaciente = async (req, res) => {
  try {
    const nuevoPaciente = new Paciente(req.body);
    await nuevoPaciente.save();
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear paciente.", error });
    console.log(error);
  }
};
export const obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener pacientes", error });
  }
};
export const obtenerPacientePorId = async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (!paciente) {
      return res.status(404).json({ mensaje: "Paciente no encontrado" });
    }
    res.status(200).json(paciente);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener paciente", error });
  }
};
export const actualizarPaciente = async (req, res) => {
  try {
    const pacienteActualizado = await Paciente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!pacienteActualizado) {
      return res.status(404).json({ mensaje: "Paciente no encontrado" });
    }
    res.status(200).json(pacienteActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar paciente", error });
  }
};
export const eliminarPaciente = async (req, res) => {
  try {
    const pacienteEliminado = await Paciente.findByIdAndDelete(req.params.id);
    if (!pacienteEliminado) {
      return res.status(404).json({ mensaje: "Paciente no encontrado" });
    }
    res.status(200).json({ mensaje: "Paciente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar paciente", error });
  }
};
