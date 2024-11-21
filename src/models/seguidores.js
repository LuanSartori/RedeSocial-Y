import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";


class Seguidores extends Model {}
Seguidores.init(
  {
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    usuario_seguido_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Seguidores"
  }
);


export default Seguidores;
