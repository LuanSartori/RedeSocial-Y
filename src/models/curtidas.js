import sequelize from "../config/database";
import { Sequelize, DataTypes } from "sequelize";

const Curtidas = sequelize.define("Curtidas", {
     publicacao_id:{type: DataTypes.STRING, allowNull: false},
     comentario_id:{type: DataTypes.STRING, allowNull: false}
});

export default Curtidas;