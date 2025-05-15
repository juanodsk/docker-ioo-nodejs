import express from "express";
import morgan from "morgan";
import pacienteRoutes from "./routes/paciente.routes.js";
import cors from "cors";

const app = express();

app.use(cors ({ origin: true }));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", pacienteRoutes);

export default app;
