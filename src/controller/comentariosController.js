import Comentarios from "../models/comentarios.js";
import Usuarios from "../models/usuarios.js";
import Publicacoes from "../models/publicacoes.js";
import { json, Sequelize } from 'sequelize';
const comentariosController= {};

// Cria os comentários
comentariosController.criarComentario = async (req, res) => {

    try{ // Tenta realizar os comandos
        const {publicacao_id, comentario} = req.body;
        const usuario_id = req.usuario_id;

        // Seleciona a publicação e o usuário desses IDs em específico
        const publicacao = await Publicacoes.findByPk(publicacao_id);
        const usuario = await Usuarios.findByPk(usuario_id);

        // Caso algum desses valores (que são obrigatórios) sejam nulos, exibe mensagem de erro
        if (comentario == null || usuario == null || publicacao == null){
            return res.status(404).json ({error: "Todos os campos são obrigatórios"});
        }
        // Caso o ID do usuário não seja encontrado, exibe mensagem de erro
        if (!usuario) {
            return res.status(404).json ({error: "Usuário não encontrado"});
        } 
        // Caso o ID da publicação não seja encontrado, exibe mensagem de erro
        if (!publicacao) {
            return res.status(404).json ({error: "Publicação não encontrada"});
        }

        // Cria o comentário e retorna mensagem de sucesso
        const novoComentario = await Comentarios.create({
            publicacao_id,
            usuario_id,
            comentario,
        });
        return res.status(201).json({comentario_id: comentario});

    } catch(erro) {
        return res.status(500).json ({error: "Internal server error"}); // Caso dê algum problema, exibe essa mensagem de erro
    } 
}

// Lista todos os comentários de uma publicação
comentariosController.listarComentarios = async (req, res) => {

    // Caso a publicação não seja encontrada, exibe mensagem de erro
    if (!publicacao_id) {
        res.status(400).json({"erro": "Publicação não informada"});
        return;
    }
    try {
        // Encontra todos os comentários, incluindo dados sobre o usuário e a publicação ao qual fazem parte
        const comentarios = await Comentarios.findAll({include: "usuario", include: "publicacao"});
    
        // Seleciona as seguintes informações de cada comentário
        var data = [];
        comentarios.forEach(coment => {
            data.push({
                comentario_id: coment.id,
                comentario: coment.comentario,
                usuario_id: coment.usuario.id,
                nick: coment.usuario.nick,
                imagem: coment.usuario.imagem,
                publicacao_id: coment.publicacao.id,
                criado_em: coment.createdAt,
            })
        });
    
        // Retorna as informações e o número de comentários
        res.status(200).json({
            data: data,
            total: data.length
        });
        return;
    } catch(erro) {
        res.status(500).json ({error: "Internal server error"});
        return;
    } 
}

// Deleta comentários
comentariosController.deletarComentarios = async (req, res) => {

    try{

        const {comentario_id, publicacao_id} = req.body;
        const usuario__id = req.usuario__id;

        // Caso o usuário ou o comentário não sejam encontrados, exibe mensagem de erro
        if (!usuario__id) {
            return res.status(400).json({error: "Usuário não encontrado"});
        } else if (!comentario_id){
            return res.status(400).json({error: "Comentário não encontrado"});
        }

        // Seleciona a publicação e o comentário por meio da chave primária
        const publicacao = await Publicacoes.findByPk(publicacao_id);
        const comentario = await Comentarios.findByPk(comentario_id);

        // Seleciona o ID do usuário que fez a publicação e do que fez o comentário
        const usuarioPub = publicacao.usuario_id;
        const usuarioComent = comentario.usuario_id;

        // Verifica se o usuário que pretende excluir o comentário é algum desses dois, para saber se tem permissão
        if (usuario__id != usuarioPub || usuario__id != usuarioComent) {
            return res.status(403).json ({error: "Usuário não autorizado"});
        }

        // Deleta o comentário
        const deletar = await Comentarios.delete({comentario_id});

        return res.status(204); // Retorna status de sucesso
    } catch(erro) {
        return res.status(500).json ({error: "Internal server error"});
    } 
}