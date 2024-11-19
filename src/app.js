import 'dotenv/config';
import path from 'path';
import sequelize from "./config/database.js";
import morgan from "morgan";
import express from "express";
const app = express();

// VARIÁVEIS DE AMBIENTE
const __dirname = import.meta.dirname;
const PORT = process.env.PORT || 3000;

// CONFIGURAÇÕES
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); // Arquivos estáticos

// MIDDLEWARES
app.use(morgan('dev')); // log das requisições no terminal
app.use(express.json()); // aceita as requisições em json
app.use(express.urlencoded({extended: false})); // desabilita objetos alinhados no body das requisições

// CONFIGURA AS ROTAS
import rotas from "./routes/index.js"
rotas(app);

// Função para sincronizar o banco de dados e iniciar o servidor
const startServer = async () => {
  try {
    await sequelize.sync(); // Isso cria as tabelas se elas não existirem
    app.listen(PORT, () => {
      console.log("Servidor rodando na porta 3000");
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
};

startServer();
