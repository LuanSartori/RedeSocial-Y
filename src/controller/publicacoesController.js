import Publicacoes from "../models/publicacoes.js";
import Usuarios from "../models/usuarios.js";
const publicacoesController = {};


// listar os usuários
publicacoesController.listarPublicacoes = async (req, res) => {
    const publicacoes = await Publicacoes.findAll();
    res.json(publicacoes);
}


// criar um novo usuário
publicacoesController.criarPublicacao = async (req, res) => {
    const { publicacao_msg, usuario_id } = req.body;

    try {
        const usuario = await Usuarios.findByPk(usuario_id);
        const publicacao = await usuario.createPublicacao({
            publicacao: publicacao_msg
        })

        res.status(201).json(publicacao);
        return;
    } catch (err) {
        console.log(err)
    }

    res.status(400).json("Não foi possível criar a publicação")
};


export default publicacoesController;
