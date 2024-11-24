import { Sequelize } from "sequelize";
import Publicacoes from "../models/publicacoes.js";
import Comentarios from "../models/comentarios.js"
const curtidasController = {};


curtidasController.curtirPublicacao = async (req, res) => {
    const { publicacao_id } = req.body;

    if (!publicacao_id) {
        res.status(400).json({ 'erro': 'Todos os campos são obrigatórios' });
        return;
    }

    try {
        const publicacao = await Publicacoes.findByPk(publicacao_id);

        if (!publicacao) {
            res.status(400).json({ 'erro': 'Publicação não encontrada' });
            return;
        }

        publicacao.qtd_likes += 1;
        publicacao.save();

        res.status(200).json({ 'qtd_likes': publicacao.qtd_likes });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'erro': 'Erro ao curtir a publicação' });
        return;
    }
}


curtidasController.descurtirPublicacao = async (req, res) => {
    const { publicacao_id } = req.body;

    if (!publicacao_id) {
        res.status(400).json({ 'erro': 'Todos os campos são obrigatórios' });
        return;
    }

    try {
        const publicacao = await Publicacoes.findByPk(publicacao_id);

        if (!publicacao) {
            res.status(400).json({ 'erro': 'Publicação não encontrada' });
            return;
        }

        publicacao.qtd_likes -= 1;
        publicacao.save();

        res.status(200).json({ 'qtd_likes': publicacao.qtd_likes });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'erro': 'Erro ao remover curtida' });
        return;
    }
}

curtidasController.curtirComentario = async (req, res) => {
    const { comentario_id } = req.body;

    if (!comentario_id) {
        res.status(400).json({ 'erro': 'Todos os campos são obrigatórios' });
        return;
    }

    try {
        const comentario = await Comentarios.findByPk(comentario_id);

        if (!comentario) {
            res.status(400).json({ 'erro': 'Comentário não encontrado' });
            return;
        }

        comentario.qtd_likes += 1;
        comentario.save();

        res.status(200).json({ 'qtd_likes': comentario.qtd_likes });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'erro': 'Erro ao curtir o comentário' });
        return;
    }
}


curtidasController.descurtirComentario = async (req, res) => {
    const { comentario_id } = req.body;

    if (!comentario_id) {
        res.status(400).json({ 'erro': 'Todos os campos são obrigatórios' });
        return;
    }

    try {
        const comentario = await Comentarios.findByPk(comentario_id);

        if (!comentario) {
            res.status(400).json({ 'erro': 'Comentário não encontrado' });
            return;
        }

        comentario.qtd_likes -= 1;
        comentario.save();

        res.status(200).json({ 'qtd_likes': comentario.qtd_likes });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'erro': 'Erro ao remover curtida' });
        return;
    }
}


export default curtidasController;