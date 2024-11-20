import sequelize from 'sequelize';
import Usuarios from "../models/usuarios.js";
import Seguidores from '../models/seguidores.js';
import Seguidores from '../models/seguidores.js';
import Seguidores from '../models/seguidores.js';
import Seguidores from '../models/seguidores.js';
import Seguidores from '../models/seguidores.js';
const seguidoresController = {};


//seguir um usuário:
seguidoresController.seguirUsuario = async (req, res) => {
    const { usuario_a_seguir, usuario_id } = req.body;

    try {
        const seguidores = await seguidores.findByPk(usuario_id); 
        const seguir = await seguidores.update( {
            usuario_seguido_id: usuario_a_seguir
           },
           {
            where: {
                usuario_id: usuario_id
            }
            res.status(201).json({"Sucesso ao seguir o usuário!"});
        return;
           }
        );
        
    } catch (erro) { //tô confusa nesses if else, tentei fazer como estava pedindo no documento, todos os 4 erros diferentes
         if (usuario_id = false) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        } if else (_seguir) {
            return res.status(400).json({ message: 'Você já segue esse usuário.' });
        } if else (usuario_id = ) { //como eu vou colocar q o usuario_id é o mesmo da própria pessoa? tem alguma função ou dado pra isso?
            return res.status(400).json({ message: 'Você não pode seguir a si mesmo.' });
        } else (!usuario_id) { //?? na minha cabeça dava pra usar um Not Found, mas parece que não. não sei como não encontrar um usuário
            return res.status(404).json({ message: 'Usuário a ser seguido não encontrado.' })
        };
    }
}
    

//deixar de seguir um usuário:
seguidoresController.deixarDeSeguirUsuario = async (req, res) => {
    const { usuario_a_seguir, usuario_id } = req.body;

    try {
        const seguidores = await seguidores.findByPk(usuario_id); 
        const deixarDeSeguir = await seguidores.delete( {
            usuario_seguido_id: usuario_a_seguir //não sei se precisa mudar alguma coisa nessa linha
           },
           {
            where: {
                usuario_id: usuario_id //aqui tbm acho que tem q mudar, mas não sei como
            }
            res.status(200).json({"Sucesso ao deixar de seguir o usuário!"});
        return;
           }
        );
        
    } catch (erro) { 
         if (usuario_id = false) { //tá certo?
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        } else ( ) { //qual lógica eu tenho que usar aqui??
            return res.status(400).json({ message: 'Você não segue este usuário.' });
        };
    }
}


//listagem de seguidores de um usuário:
seguidoresController.listagemDeSeguidores = async (req, res) => {
    try {
        const {usuario_id} = req.params;

        const Seguidores = await Seguidores.findAll(
            {
                where: {
                    seguidores_id: usuario_id
                },
                include: [ //é aqui que são os paramwtros?por algum motivo acho que os atributos ficariam nos models. 
                    { model: Usuarios, as: 'Seguidores', attributes: ["seguidores_id", "nome", "nick", "imagem", total: Seguidores.findAll, currentPage:1, totalPages:10 ]}
                ]
            }
            res.status(200).json({Seguidores});
        return;
        );

    } catch (erro) {
        res.status(500).json({ error: 'Erro ao buscar seguidores.'});
    }
}


//listagem de usuários que um usuário segue:
seguidoresController.listagemDeUsuarios = async (req, res) => {
    try {
        const {usuario_id} = req.params;

        const Seguindo = await Seguidores.findAll( //Seguidores mesmo ou Seguindo?
            {
                where: {
                    usuario_seguido_id: usuario_id
                },
                include: [ //é aqui que são os paramwtros?por algum motivo acho que os atributos ficariam nos models. 
                    { model: Usuarios, as: 'Seguindo', attributes: ["seguidores_id", "nome", "nick", "imagem", total: Seguindo.findAll, currentPage:1, totalPages:10 ]}
                ]
            }
            res.status(200).json({Seguindo});
        return;
        );

    } catch (erro) {
        res.status(500).json({ error: 'Erro ao buscar usuários seguidos.'});
    }
}


export default seguidoresController;