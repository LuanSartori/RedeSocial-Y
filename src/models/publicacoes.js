import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from "./usuario.js";


const Publicacao = sequelize.define("Publicacao", {
  publicacao_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  publicacao: { type: DataTypes.STRING, allowNull: false },
  usuario_id: {
     type: DataTypes.UUID,
     references: {
      model: Usuario,
      key: usuario_id
     }
  },
  nick: { type: DataTypes.STRING, allowNull: false },
  imagem: { type: DataTypes.STRING, allowNull: false},
  qnt_likes: { type: DataTypes.NUMBER, allowNull: false},
  criado_em: { type: DataTypes.DATE, allowNull: false}
});

// Dentro de Publicacao vai ter uma chave estrangeira apontando para Usuario
Publicacao.belongsTo(Usuario);

 
export default Usuario;
