import express from "express";
import morgan from "morgan";
import sequelize from "./config/database.js";

// MIDDLEWARES
const app = express();
app.use(express.json()); // aceita as requisições em json
app.use(express.urlencoded({extended: false})); // desabilita objetos alinhados no body das requisições
app.use(morgan('dev')); // log das requisições no terminal

// IMPORTANDO AS ROTAS
import indexRouter from './routes/index.js';
import usuarioRouter from './routes/usuarioRoute.js';

// CONFIGURANDO AS ROTAS
app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);

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
