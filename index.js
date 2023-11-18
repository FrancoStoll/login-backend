import express from "express";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import cors from "cors";
import conn from "./config/db.js";

const app = express();
app.use(express.json());

dotenv.config();
conn();
// Configurar CORS

const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No tiene permisos
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/api/usuarios", usuarioRoutes);


const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT, () => {
  console.log("servidor en el puerto 4000", PORT);
});