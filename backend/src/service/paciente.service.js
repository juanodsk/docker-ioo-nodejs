import Paciente from "../models/paciente.model.js";

class PacienteService {
  async crearPaciente(data) {
    try {
      const nuevoPaciente = new Paciente(data);
      await nuevoPaciente.save();
      return nuevoPaciente;
    } catch (error) {
      throw new Error("Error al crear paciente.");
    }
  }

  async obtenerPacientes() {
    try {
      const pacientes = await Paciente.find();
      return pacientes;
    } catch (error) {
      throw new Error("Error al obtener pacientes.");
    }
  }

  async obtenerPacientePorId(id) {
    try {
      const paciente = await Paciente.findById(id);
      if (!paciente) {
        throw new Error("Paciente no encontrado");
      }
      return paciente;
    } catch (error) {
      throw new Error("Error al obtener paciente.");
    }
  }

  async actualizarPaciente(id, data) {
    try {
      const pacienteActualizado = await Paciente.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      );
      if (!pacienteActualizado) {
        throw new Error("Paciente no encontrado");
      }
      return pacienteActualizado;
    } catch (error) {
      throw new Error("Error al actualizar paciente.");
    }
  }

  async eliminarPaciente(id) {
    try {
      const pacienteEliminado = await Paciente.findByIdAndDelete(id);
      if (!pacienteEliminado) {
        throw new Error("Paciente no encontrado");
      }
      return { mensaje: "Paciente eliminado correctamente" };
    } catch (error) {
      throw new Error("Error al eliminar paciente.");
    }
  }
}

export default new PacienteService();
