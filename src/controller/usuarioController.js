import Usuario from "../models/usuario.js";
import { Sequelize } from 'sequelize';


// listar os usuários
export const listarUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
}


// criar um novo usuário
export const criarUsuario = async (req, res) => {
    const { nome, email, senha, dataNasc, nick } = req.body;
    const usuario = await Usuario.create({ nome, email, senha, dataNasc, nick });
    res.status(201).json(usuario);
};
