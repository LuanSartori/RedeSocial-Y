import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Usuarios from "./usuarios.js";
import Publicacoes from "./publicacoes.js";


class Comentarios extends Model {}
Comentarios.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    publicacao_id: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qtd_likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Comentarios",
  }
);

Comentarios.belongsTo(Usuarios, { foreignKey: "usuario_id", as: "usuario" });
Usuarios.hasMany(Comentarios, { foreignKey: "usuario_id", as: "comentarios" });

Comentarios.belongsTo(Publicacoes, { foreignKey: "publicacao_id", as: "publicacao"});
Publicacoes.hasMany(Comentarios, { foreignKey: "publicacao_id", as: "comentarios"})

export default Comentarios;
