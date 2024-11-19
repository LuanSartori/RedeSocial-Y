import Usuario from "../models/usuarios.js";
const usuariosController = {};


// listar os usuários
usuariosController.listarUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
}


// criar um novo usuário
usuariosController.criarUsuario = async (req, res) => {
    const data = req.body;
    const usuario = await Usuario.create(data);
    res.status(201).json(usuario);
};


export default usuariosController;
