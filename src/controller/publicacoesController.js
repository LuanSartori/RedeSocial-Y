import Publicacoes from "../models/publicacoes.js";
import Usuarios from "../models/usuarios.js";
const publicacoesController = {};


// listar os usuários
publicacoesController.listarPublicacoes = async (req, res) => {

    try {
        const publicacoes = await Publicacoes.findAll({include: "usuario"});
    
        var data = [];
        publicacoes.forEach(pub => {
            data.push({
                publicacao_id: pub.id,
                publicacao: pub.publicacao,
                usuario_id: pub.usuario.id,
                nick: pub.usuario.nick,
                imagem: pub.usuario.imagem,
                qtd_likes: pub.qtd_likes,
                criado_em: pub.createdAt
            })
        });
    
        res.status(200).json({
            data: data,
            total: data.length
        });
        return;
    } catch (err) {
        res.status(500).json({"erro": "Erro ao buscar publicações"});
        return;
    }
}


// criar um novo usuário
publicacoesController.criarPublicacao = async (req, res) => {
    const { publicacao, usuario_id } = req.body;
    if (!publicacao.trim()) {
        res.status(400).json({"erro": "Todos os campos são obrigatórios"});
        return;
    }

    try {
        const usuario = await Usuarios.findByPk(usuario_id);
        if (!usuario) {
            res.status(400).json({"erro": "Usuário não encontrado"});
            return;
        }

        const publi = await usuario.createPublicacao({
            publicacao: publicacao
        })

        res.status(201).json({publicacao_id: publi.id});
        return;
    } catch (err) {
        res.status(500).json({"erro": "Erro ao criar a publicação"});
    }
};


export default publicacoesController;
