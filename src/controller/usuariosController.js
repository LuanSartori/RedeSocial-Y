import { Op } from "sequelize";
import Usuarios from "../models/usuarios.js";
const usuariosController = {};


// listar os usuários
usuariosController.listarUsuarios = async (req, res) => {
    const search = req.query.search || false;
    var usuarios;

    try {
        if (search) {
            usuarios = await Usuarios.findAll({where: {
                [Op.or]: [
                    { nome: { [Op.substring]: search } },
                    { nick: { [Op.substring]: search } }
                ]
            }});
        } else {
            usuarios = await Usuarios.findAll();
        }
        
        res.status(200).json(usuarios);
        return;
    } catch (err) {
        res.status(500).json({ 'erro': 'Erro ao listar usuários' });
        return;
    }
}


// criar um novo usuário
usuariosController.criarUsuario = async (req, res) => {
    const { nome, email, senha, nascimento, nick } = req.body;

    // TODO: Validações

    try {

        const usuario = await Usuarios.create({
            nome: nome,
            email: email,
            senha: senha,
            nascimento: nascimento,
            nick: nick
        })

        res.status(201).json(usuario);
        return;
    } catch (err) {
        res.status(500).json({ 'erro': 'Erro ao criar o usuário' });
        return;
    }
};


usuariosController.detalhesDoUsuario = async (req, res) => {
    const { usuario_id } = req.params;

    try {
        const usuario = await Usuarios.findByPk(usuario_id);

        if (!usuario) {
            res.status(400).json({ 'erro': 'Usuário não encontrado!' });
        }

        res.status(201).json({
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            nascimento: usuario.nascimento,
            nick: usuario.nick
        });
        return;
    } catch (err) {
        res.status(500).json({ 'erro': 'Erro ao detalhar o usuário' });
        return;
    }
}


usuariosController.atualizarUsuario = async (req, res) => {
    const { usuario_id } = req.params;
    const { nome, email, nick } = req.body;

    // TODO: Validações

    try {
        const usuario = await Usuarios.findByPk(usuario_id);

        if (!usuario) {
            res.status(400).json({ 'erro': 'Usuário não encontrado!' });
        }

        usuario.set({
            nome: nome || usuario.nome,
            email: email || usuario.email,
            nick: nick || usuario.nick,
        });
        usuario.save();

        res.status(201).json(usuario);
        return;
    } catch (err) {
        res.status(500).json({ 'erro': 'Erro ao atualizar o usuário' });
        return;
    }
}


export default usuariosController;
