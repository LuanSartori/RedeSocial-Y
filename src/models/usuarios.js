import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Seguidores from "./seguidores.js";


class Usuarios extends Model {}
Usuarios.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nick: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    imagem: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Usuarios",
  }
);

Usuarios.belongsToMany(Usuarios, {
  through: Seguidores,
  foreignKey: 'usuario_id',
  otherKey: 'seguidor_id',
  as: {
    singular: "seguir",
    plural: "seguem"
  }
});
Usuarios.belongsToMany(Usuarios, {
  through: Seguidores,
  foreignKey: 'seguidor_id',
  otherKey: 'usuario_id',
  as: {
    singular: "seguidor",
    plural: "seguidores"
  }
});

export default Usuarios;
