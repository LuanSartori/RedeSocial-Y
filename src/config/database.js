import { Sequelize } from "sequelize";


// configura o banco de dados usado
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
})


// CONEXÃO COM BANCO DE DADOS MySQL
// estabelece a conexão com o banco de dados e depois autentica
/*
const sequelize = new Sequelize(
    'redesocial', // database
    'root', // username
    '', // password
    {
       host: 'localhost',
       dialect: 'mysql',
       port: 3306
    }
);
sequelize.authenticate().catch((error) => {
    console.error('Unable to connect to the database: ', error);
});
*/


export default sequelize;
