import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";


class Seguidores extends Model {}
Seguidores.init(
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
    seguidor_id: {
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
