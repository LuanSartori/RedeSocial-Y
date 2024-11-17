import Publicacao from "../models/publicacoes";
import { Sequelize } from 'sequelize';
import Usuario from "../models/publicacoes";


// listar os usuários
export const listarPublicacoes = async (req, res) => {
    const publicacoes = await Publicacao.findAll();
    res.json(usuarios);
}


// criar um novo usuário
export const criarPublicacao = async (req, res) => {
    const { publicacao_texto, usuario_id } = req.body;

    const usuario = await Usuario.findByPk(usuario_id);

    const publicacao = await Publicacao.create({ publicacao_texto, usuario_id, nick, imagem, qnt_likes, HORA_ATUAL });

    res.status(201).json(publicacao);
};
