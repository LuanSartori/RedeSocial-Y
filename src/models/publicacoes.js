import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Usuarios from "./usuarios.js";


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
    timestamps: true
  }
);

Publicacoes.belongsTo(Usuarios, { foreignKey: "usuario_id", as: "usuario" });
Usuarios.hasMany(Publicacoes, { foreignKey: "usuario_id", as: "publicacao" });

Publicacoes.belongsToMany(Usuarios, { through: "CurtidasPublicacoes", as: "Curtidas" });
Usuarios.belongsToMany(Publicacoes, { through: "CurtidasPublicacoes", as: "Curtidas" });

export default Publicacoes;
