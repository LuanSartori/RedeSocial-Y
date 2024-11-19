import sequelize from 'sequelize';
import Seguidores from "..models/seguidores.js";
import Usuarios from '../models/usuarios';
const seguidoresController = {};


//seguir um usuário
seguidoresController.seguirUsuario = async (req, res) => {
    const { usuario_a_seguir, usuario_id } = req.body;

    try {
        const seguidores = await seguidores.findByPk(usuario_id); 
        const seguir = await seguidores.update(
            {
            usuario_seguido_id: usuario_a_seguir
           },
           {
            where: {
                usuario_id: usuario_id
            }
           }
        );
        
    } catch (erro) {
        console.log(erro)
        if (req = 400 )
    }
    }
    

//listar seguidores
//seguidoresController.listarSeguidores = async (req, res) => {

//}


export default seguidoresController;