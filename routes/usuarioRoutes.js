import express from "express";
import {createAcc, auth, perfil} from '../controllers/usuarioController.js'
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router();

// Register and auth

// Registar

router.post("/create", createAcc);

// Login
router.post("/login", auth);

router.get("/perfil", checkAuth, perfil);
export default router;
