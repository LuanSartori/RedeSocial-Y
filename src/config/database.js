import { Sequelize } from "sequelize";


// configura o banco de dados usado
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    define: {
        timestamps: true
    },
    logging: console.log
})


export default sequelize;
