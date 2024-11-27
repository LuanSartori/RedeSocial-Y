import Publicacoes from "../models/publicacoes.js";
import Usuarios from "../models/usuarios.js";
import Comentarios from "../models/comentarios.js"
const publicacoesController = {};


publicacoesController.listarPublicacoes = async (req, res) => {

    try {
        const publicacoes = await Publicacoes.findAll({
            include: [
            "usuario",
            {
                model: Comentarios,
                as: "comentarios",
                attributes: [ 'id' ]
            }
            ]
        });
    
        var data = [];
        publicacoes.forEach(pub => {
            data.push({
                publicacao_id: pub.id,
                publicacao: pub.publicacao,
                usuario_id: pub.usuario.id,
                nick: pub.usuario.nick,
                imagem: pub.usuario.imagem,
                qtd_likes: pub.qtd_likes,
                qtd_comentarios: pub.comentarios.length,
                criado_em: pub.criado_em
            })
        });
    
        res.status(200).json({
            data: data,
            total: data.length
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'erro': "Erro ao buscar publicações" });
        return;
    }
}


publicacoesController.criarPublicacao = async (req, res) => {
    const { publicacao, usuario_id } = req.body;
    if (!publicacao.trim()) {
        res.status(400).json({ 'erro': "Todos os campos são obrigatórios" });
        return;
    }

    try {
        const usuario = await Usuarios.findByPk(usuario_id);
        if (!usuario) {
            res.status(400).json({  'erro': "Usuário não encontrado" });
            return;
        }

        const publi = await usuario.createPublicacao({
            publicacao: publicacao
        })

        res.status(201).json({publicacao_id: publi.id});
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({  'erro': "Erro ao criar a publicação"});
        return;
    }
};


publicacoesController.listarPublicacoesDeUmUsuario = async (req, res) => {
    const { usuario_id } = req.params;
    var data = [];

    try {
        
        const usuario = await Usuarios.findByPk(usuario_id, {include: [{association: 'publicacoes', include: ['comentarios']}] });
        if (!usuario) {
            res.status(404).json({ 'erro': 'Usuário não encontrado' });
            return;
        }
        
        const publicacoes = usuario.publicacoes;
        publicacoes.forEach((pub) => {
            data.push({
                publicacao_id: pub.id,
                publicacao: pub.publicacao,
                usuario_id: pub.usuario_id,
                nick: usuario.nick,
                imagem: usuario.imagem,
                qtd_likes: pub.qtd_likes,
                qtd_comentarios: pub.comentarios.length,
                criado_em: pub.criado_em
            });
        })

        res.status(200).json({
            data: data,
            total: data.length
        });
        return;

    } catch (err) {
        console.log(err);
        res.status(500).json({ 'erro': 'Erro ao listar as publicações' })
        return;
    }

}


publicacoesController.obterPublicacao = async (req, res) => {
    const { publicacao_id } = req.params;

    try {
        const publicacao = await Publicacoes.findByPk(publicacao_id, { include: ['usuario', { association: 'comentarios', include: 'usuario' }] });
        if (!publicacao) {
            res.status(404).json({ 'erro': 'Publicação não encontrada' });
            return;
        }

        const comentarios = publicacao.comentarios.map( (coment) => { 
            return {
                comentario_id: coment.id,
                comentario: coment.comentario,
                usuario_id: coment.usuario_id,
                nick: coment.usuario.nick,
                imagem: coment.usuario.imagem,
                qtd_likes: coment.qtd_likes,
                criado_em: "2024-01-01T00:00:00.000Z" // valor artificial para o site front-end funcionar
            }
        } )
        const data = {
            publicacao_id: publicacao.id,
            publicacao: publicacao.publicacao,
            usuario_id: publicacao.usuario.id,
            nick: publicacao.usuario.nick,
            imagem: publicacao.usuario.imagem,
            qtd_likes: publicacao.qtd_likes,
            criado_em: publicacao.criado_em,
            comentarios: comentarios
        }

        res.status(200).json(data);
        return;
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'erro': 'Erro ao listar as publicações' });
        return;
    }
}


publicacoesController.deletarPublicacao = async (req, res) => {
    const { publicacao_id, usuario_id } = req.body;

    try {
        const publicacao = await Publicacoes.findByPk(publicacao_id, { include: ['usuario'] });
        const usuario = await Usuarios.findByPk(usuario_id);
        if (!publicacao) {
            res.status(404).json({ 'erro': 'Publicação não encontrada' });
            return;
        } else if (!publicacao) {
            res.status(404).json({ 'erro': 'Usuário não encontrado' });
            return;
        } else if (usuario.id != publicacao.usuario_id) {
            res.status(403).json({ 'erro': 'Usuário não autorizado' });
            return;
        }

        await publicacao.destroy();

        res.status(200).json({ 'mensagem': 'Publicação deletada com sucesso'});
        return;
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'erro': 'Erro ao listar as publicações' })
        return;
    }
}


export default publicacoesController;
