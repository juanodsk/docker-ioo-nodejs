import { Router } from "express";
import {
  crearPaciente,
  obtenerPacientes,
  obtenerPacientePorId,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/paciente.controller.js";

const router = Router();

router.post("/registrar", crearPaciente);
router.get("/paciente/", obtenerPacientes);
router.get("/paciente/:id", obtenerPacientePorId);
router.put("/actualizar/:id", actualizarPaciente);
router.delete("/eliminar/:id", eliminarPaciente);

export default router;
