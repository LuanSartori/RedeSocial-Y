import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './usuario.js';

const Seguidores = sequelize.define("Seguidores", {
    seguidor_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true},
    
    usuario_a_ser_seguido_id: {
        type: DataTypes.UUID,
        references: {
            model: Usuario,
            key: usuario_id} }
});

Seguidores.belongsTo(Usuarios);

export default Seguidores;