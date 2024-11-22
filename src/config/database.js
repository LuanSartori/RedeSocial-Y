import { Sequelize } from "sequelize";
import 'dotenv/config';


// CONFIG BD PARA PRODUÇÃO
const sequelize = new Sequelize(
    process.env.DB_PROD_NAME,
    process.env.DB_PROD_USER,
    process.env.DB_PROD_PASSWORD,
    {
        host: process.env.DB_PROD_HOST,
        port: process.env.DB_PROD_PORT,
        dialect: process.env.DB_PROD_DIALECT,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false,
        define: {
            timestamps: false
        }
    }
);


// CONFIG BD PARA DESENVOLVIMENTO
// const sequelize = new Sequelize({
//     dialect: process.env.DB_DEV_DIALECT || "sqlite",
//     storage: process.env.DB_DEV_STORAGE || "./database.sqlite",
//     define: {
//         timestamps: true
//     },
//     logging: console.log
// })


export default sequelize;
