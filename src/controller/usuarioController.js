import Usuario from "../models/usuarios.js";


// listar os usuários
export const listarUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
}


// criar um novo usuário
export const criarUsuario = async (req, res) => {
    const data = req.body;
    const usuario = await Usuario.create(data);
    res.status(201).json(usuario);
};
