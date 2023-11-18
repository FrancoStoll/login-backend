import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -token-  -__v"
      );

      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Error al autenticar" });
    }
  }

  if (!token) {
    const error = new Error("Token no válido para realizar esta operación");

    return res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
