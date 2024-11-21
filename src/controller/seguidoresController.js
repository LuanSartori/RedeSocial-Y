import Usuarios from "../models/usuarios.js";
const seguidoresController = {};


seguidoresController.seguirUsuario = async (req, res) => {
    const { usuario_id, usuario_a_seguir_id } = req.body;
    
    if (!toString(usuario_id).trim() || !toString(usuario_a_seguir_id).trim()) {
        res.status(400).json({ message: 'Todos os campos são obrigatórios'});
        return;
    } else if ( usuario_id == usuario_a_seguir_id) {
        res.status(400).json({ message: 'Você não pode seguir a si mesmo.' });
        return;
    }

    try {
        const usuario_que_segue = await Usuarios.findByPk(usuario_id);
        const usuario_a_seguir = await Usuarios.findByPk(usuario_a_seguir_id);

        if (!usuario_a_seguir){
            res.status(404).json({ message: 'Usuário a ser seguido não encontrado.' });
            return;
        } else if (await usuario_a_seguir.hasSeguidor(usuario_que_segue)) {
            res.status(400).json({ message: 'Você já segue esse usuário.' });
            return;
        };

        await usuario_a_seguir.addSeguidor(usuario_que_segue);
        res.status(201).json({ seguidor_id: usuario_a_seguir_id });
        return;
        
    } catch (err) {
        console.log(err);
        res.status(500).json({'erro': 'Erro ao seguir usuário'});
    }
}
    

seguidoresController.deixarDeSeguirUsuario = async (req, res) => {
    const { usuario_id, usuario_a_seguir_id } = req.body;

    if (!usuario_id.trim() || !usuario_a_seguir_id.trim()) {
        res.status(400).json({ message: 'Todos os campos são obrigatórios'});
        return;
    };

    try {
        const usuario_que_segue = await Usuarios.findByPk(usuario_id);
        const usuario_a_deixar_de_seguir = await Usuarios.findByPk(usuario_a_seguir_id);

        if (!usuario_a_deixar_de_seguir){ 
            res.status(404).json({ message: 'Usuário a ser seguido não encontrado.' });
            return;
        } else if (!usuario_a_deixar_de_seguir.hasSeguidor(usuario_que_segue)) {
            res.status(400).json({ message: 'Você não segue esse usuário.' });
            return;
        };

        usuario_a_deixar_de_seguir.removeSeguidor(usuario_que_segue);
        res.status(201).json({ seguidor_id: usuario_a_seguir_id });
        return;
        
    } catch (erro) { 
        res.status(500).json({ 'erro': 'Erro ao deixar de seguir usuário.' });
    }
}


seguidoresController.listagemDeSeguidores = async (req, res) => {
    const { usuario_id } = req.params;
    const page = req.params.page || 1;
    const limit = req.params.page || 10;
    var data = [];

    try {
        const usuario = await Usuarios.findByPk(usuario_id);
        if (!usuario) {
            res.status(400).json({ 'erro': 'Usuário não encontrado.' });
            return;
        };

        const seguidores = await usuario.getSeguidores();
        seguidores.forEach(user => {
            data.push({
                seguidor_id: user.id,
                nome: user.nome,
                nick: user.nick,
                imagem: user.imagem
            })
        });

        const total = data.length;
        const totalPages = Math.ceil(total / limit);
        res.status(200).json({
            data: data,
            total: data.length,
            currentPage: page,
            totalPages: totalPages
        })
        return;

    } catch (erro) {
        res.status(500).json({ 'erro': 'Erro ao buscar seguidores.'});
        return;
    }
}


seguidoresController.listagemDeUsuarios = async (req, res) => {
    const { usuario_id } = req.params;
    var data = [];

    try {
        const usuario = await Usuarios.findByPk(usuario_id);
        if (!usuario) {
            res.status(400).json({ 'erro': 'Usuário não encontrado.' });
            return;
        };

        const usuarios_seguidos = await usuario.getSeguem();
        usuarios_seguidos.forEach(user => {
            data.push({
                usuario_id: user.id,
                nome: user.nome,
                nick: user.nick,
                imagem: user.imagem
            })
        });

        const total = data.length;
        res.status(200).json({
            data: data,
            total: total,
        })
        return;

    } catch (erro) {
        res.status(500).json({ 'erro': 'Erro ao buscar usuários seguidos.'});
        return;
    }
}


export default seguidoresController;
