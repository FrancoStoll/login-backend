import generarJWT from "../helpers/jwt.js";
import Usuario from "../models/Usuario.js";

const createAcc = async (req, res) => {
  const { email } = req.body;

  const userExist = await Usuario.findOne({ email });

  if (userExist) {
    const error = new Error("Este correo ya esta en uso");

    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    await usuario.save();

    res.json({
      ok: true,
      msg: "Usuario creado correctamente :)",
    });
  } catch (error) {
    console.log(error);
  }
};

const auth = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  const usuario = await Usuario.findOne({ email });
  console.log(usuario);

  if (!usuario) {
    const error = new Error("Este usuario no esta registrado");

    return res.status(404).json({ msg: error.message });
  }

  if (await usuario.checkPassword(password)) {
    res.json({
      res: true,
      _id: usuario._id,
      name: usuario.name,
      email: usuario.email,
      token: generarJWT(usuario._id),
      createdAt: usuario.createdAt
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};

export { createAcc, auth, perfil };
