import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Usuarios from "./usuarios.js";
import CurtidasPublicacoes from "./curtidasPublicacoes.js";


class Publicacoes extends Model {}
Publicacoes.init(
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
    publicacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qtd_likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  },
  {
    sequelize,
    modelName: "Publicacoes",
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: false
  }
);

Publicacoes.belongsTo(Usuarios, { foreignKey: "usuario_id", as: "usuario" });
Usuarios.hasMany(Publicacoes, { foreignKey: "usuario_id", as: {singular: 'publicacao', plural: 'publicacoes'} });

Publicacoes.belongsToMany(Usuarios, {
  through: CurtidasPublicacoes,
  foreignKey: "publicacao_id",
  otherKey: "usuario_id",
  as: {
    singular: "curtidaNaPublicacao",
    plural: "curtidasNaPlublicacao"
  }
});
Usuarios.belongsToMany(Publicacoes, {
  through: CurtidasPublicacoes,
  foreignKey: "usuario_id",
  otherKey: "publicacao_id",
  as: {
    singular: "curtidaNaPublicacao",
    plural: "curtidasNaPublicacoes"
  }
});

export default Publicacoes;
