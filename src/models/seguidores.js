import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Usuarios from "./usuarios.js";


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
    usuario_seguido_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Seguidores",
    timestamps: true,
  }
);

Seguidores.belongsTo(Usuarios, { foreignKey: "usuario_id", as: "Seguidor" });
Usuarios.hasMany(Seguidores, { foreignKey: "usuario_id", as: "Seguidor" })

Seguidores.belongsTo(Usuarios, { foreignKey: "usuario_seguido_id", as: "Seguido" });
Usuarios.hasMany(Seguidores, { foreignKey: "usuario_seguido_id", as: "Seguido" })

export default Seguidores;
