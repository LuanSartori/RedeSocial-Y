import { Sequelize } from "sequelize";
import 'dotenv/config';
var sequelize;

const dev_status = process.env.DEV_STATUS || 'DEV';
if (dev_status == 'PROD') {

    // CONFIG BD PARA PRODUÇÃO
    sequelize = new Sequelize(
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

} else if (dev_status == 'DEV') {

    // CONFIG BD PARA DESENVOLVIMENTO
    sequelize = new Sequelize({
        dialect: process.env.DB_DEV_DIALECT || "sqlite",
        storage: process.env.DB_DEV_STORAGE || "./database.sqlite",
        define: {
            timestamps: true
        },
        logging: console.log
    })

}


export default sequelize;
