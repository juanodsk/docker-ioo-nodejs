import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://mongodb:27017/clinica");
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("Error al conectar a la base de datos", error);
  }
};
