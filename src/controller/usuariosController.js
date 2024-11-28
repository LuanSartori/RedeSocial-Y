import { Op } from "sequelize";
import bcrypt from "bcrypt";
import Usuarios from "../models/usuarios.js";
import { calcularIdade } from "../utils/util.js";
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
        console.log(err);
        res.status(500).json({ 'erro': 'Erro ao listar usuários' });
        return;
    }
}


// criar um novo usuário
usuariosController.criarUsuario = async (req, res) => {
    const { nome, email, senha, nascimento, nick, imagem } = req.body;

    try {

        const saltRounds = 10;
        const hashSenha = bcrypt.hashSync(senha, saltRounds);
     
        if(!{nome, email, senha, nascimento, nick}){ 
            res.status(400).json({message: 'Todos os campos são obrigatorios' });  
            return;
        } else if ((await Usuarios.findAll( { where: {email: email} } )).length ){ 
            res.status(400).json({message: 'Email já está em uso' });  
            return;
        } else if ((await Usuarios.findAll( { where : {nick: nick} })).length ){ 
            res.status(400).json({message: 'Nick já está em uso' });  
            return;
        };

        const datanascimento = new Date(nascimento);
        if(calcularIdade(datanascimento, new Date())<= 16){ 
            res.status(400).json({message: 'A idade deve ser maior que 16 anos' });  
            return;
        };

        const usuario = await Usuarios.create({
            nome: nome,
            email: email,
            senha: hashSenha,
            nascimento: nascimento,
            nick: nick,
            imagem: imagem
        })
    
        res.status(201).json(usuario);
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'erro': 'Erro ao criar o usuário' });
        return;
    }

};


usuariosController.detalhesDoUsuario = async (req, res) => {
    const { usuario_id } = req.params;

    try {
        const usuario = await Usuarios.findByPk(usuario_id);

        if (!usuario) {
            res.status(404).json({ 'erro': 'Usuário não encontrado!' });
        }

        res.status(200).json({
            nome: usuario.nome,
            email: usuario.email,
            nick: usuario.nick,
            imagem: usuario.imagem || "https://cdn-icons-png.flaticon.com/128/149/149071.png",
            senha: usuario.senha,
            nascimento: usuario.nascimento,
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'erro': 'Erro ao detalhar o usuário' });
        return;
    }
}


usuariosController.atualizarUsuario = async (req, res) => {
    const { usuario_id } = req.params;
    const { nome, email, nick } = req.body;
    
    try {
        const usuario = await Usuarios.findByPk(usuario_id);

        if (!usuario) {
            res.status(404).json({ 'erro': 'Usuário não encontrado!' });
        } 

        if(nome == usuario.nome && email == usuario.email && nick == usuario.nick){ 
            res.status(400).json({message: 'Pelo menos um campo deve ser fornecido para atualização' });  
            return;
        };
     
        if(email != usuario.email && await Usuarios.findAll({where : {email: email} })){
            res.status(400).json({message: 'Email já está em uso' });  
            return;
        };

        if(nick != usuario.nick && await Usuarios.findAll({where : {nick: nick} })){
            res.status(400).json({message: 'Nick já está em uso' });  
            return;
        };

        usuario.set({
            nome: nome || usuario.nome,
            email: email || usuario.email,
            nick: nick || usuario.nick,
        });
        await usuario.save();

        res.status(201).json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            nick: usuario.nick,
            imagem: usuario.imagem,
            nascimento: usuario.nascimento
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'erro': 'Erro ao atualizar o usuário' });
        return;
    }
}

export default usuariosController;
