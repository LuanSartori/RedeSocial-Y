import homeRouter from './homeRouter.js';
import usuariosRouter from "./usuariosRouter.js";
import publicacoesRouter from "./publicacoesRouter.js";


// função que indexa todas as pastas de rotas
export default function(app) {
    app.use("/", homeRouter);
    app.use("/usuarios", usuariosRouter);
    app.use("/publicacoes", publicacoesRouter);
}
