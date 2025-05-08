import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    telefono: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    fechaIngreso: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Paciente", pacienteSchema);
