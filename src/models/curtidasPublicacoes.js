import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";


class CurtidasPublicacoes extends Model {}
CurtidasPublicacoes.init(
  {
    publicacao_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CurtidasPublicacoes",
    timestamps: true,
  }
);


export default CurtidasPublicacoes;
