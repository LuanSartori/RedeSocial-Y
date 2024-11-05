import express from "express";
import morgan from "morgan";
import sequelize from "./config/database.js";

// MIDDLEWARES
const app = express();
app.use(express.json()); // aceita as requisições em json
app.use(express.urlencoded({extended: false})); // desabilita objetos alinhados no body das requisições
app.use(morgan('dev')); // log das requisições no terminal

// CONFIGURA AS ROTAS
import rotas from "./routes/index.js"
rotas(app);

// Função para sincronizar o banco de dados e iniciar o servidor
const startServer = async () => {
  try {
    await sequelize.sync(); // Isso cria as tabelas se elas não existirem
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
};

startServer();
