import Comentarios from "../models/comentarios.js";
import Usuarios from "../models/usuarios.js";
import Publicacoes from "../models/publicacoes.js";
const comentariosController= {};


// Cria os comentários
comentariosController.criarComentario = async (req, res) => {

    try{ // Tenta realizar os comandos
        const {publicacao_id, usuario_id, comentario} = req.body;

        // Seleciona a publicação e o usuário desses IDs em específico
        const publicacao = await Publicacoes.findByPk(publicacao_id);
        const usuario = await Usuarios.findByPk(usuario_id);

        // Caso algum desses valores (que são obrigatórios) sejam nulos, exibe mensagem de erro
        if (comentario == null || usuario == null || publicacao == null){
            return res.status(404).json ({ 'erro': "Todos os campos são obrigatórios" });
        }
        // Caso o ID do usuário não seja encontrado, exibe mensagem de erro
        if (!usuario) {
            return res.status(404).json ({ 'erro': "Usuário não encontrado" });
        } 
        // Caso o ID da publicação não seja encontrado, exibe mensagem de erro
        if (!publicacao) {
            return res.status(404).json ({ 'erro': "Publicação não encontrada" });
        }

        // Cria o comentário e retorna mensagem de sucesso
        const novoComentario = await Comentarios.create({
            publicacao_id: publicacao_id,
            usuario_id: usuario_id,
            comentario: comentario,
        });
        return res.status(201).json({comentario_id: novoComentario.id});

    } catch (err) {
        console.log(err);
        return res.status(500).json ({ 'erro': "Erro ao criar comentário"}); // Caso dê algum problema, exibe essa mensagem de erro
    } 
}

// Lista todos os comentários de uma publicação
comentariosController.listarComentarios = async (req, res) => {
    const { publicacao_id } = req.params;

    // Caso a publicação não seja encontrada, exibe mensagem de erro
    if (!publicacao_id) {
        res.status(400).json({"erro": "Publicação não informada"});
        return;
    }

    try {
        // Encontra todos os comentários, incluindo dados sobre o usuário e a publicação ao qual fazem parte
        const comentarios = await Comentarios.findAll({include: ['usuario', 'publicacao']});
    
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
                // criado_em: coment.criado_em,
                criado_em: "2024-01-01T00:00:00.000Z", // valor artificial para o site front-end funcionar
            })
        });
    
        // Retorna as informações e o número de comentários
        res.status(200).json({
            data: data,
            total: data.length
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json ({ 'erro': 'Erro ao buscar comentários' });
        return;
    } 
}

// Deleta comentários
comentariosController.deletarComentario = async (req, res) => {
    try{
        const {comentario_id, usuario_id} = req.body;

        // Seleciona a publicação e o comentário por meio da chave primária
        const usuario = await Usuarios.findByPk(usuario_id);
        const comentario = await Comentarios.findByPk(comentario_id, { include: 'publicacao' });

        // Caso o usuário ou o comentário não sejam encontrados, exibe mensagem de erro
        if (!usuario) {
            return res.status(400).json({ 'erro': "Usuário não encontrado" });
        } else if (!comentario){
            return res.status(400).json({ 'erro': "Comentário não encontrado" });
        }

        // Seleciona o ID do usuário que fez a publicação e do que fez o comentário
        const usuarioPub = comentario.publicacao.usuario_id;
        const usuarioComent = comentario.usuario_id;

        // Verifica se o usuário que pretende excluir o comentário é algum desses dois, para saber se tem permissão
        if (usuario_id != usuarioPub && usuario_id != usuarioComent) {
            res.status(403).json({ 'erro': 'Usuário não autorizado' });
            return;
        }

        // Deleta o comentário
        await comentario.destroy()

        res.status(204);
        return;
    } catch (err) {
        console.log(err);
        return res.status(500).json ({ 'erro': 'Erro ao deletar comentário' });
    } 
}


export default comentariosController;
