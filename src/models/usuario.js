import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  senha: { type: DataTypes.STRING, allowNull: false },
  dataNasc: { type: DataTypes.DATEONLY, allowNull: false},
  nick: { type: DataTypes.STRING, allowNull: false }
});
 
export default Usuario;
