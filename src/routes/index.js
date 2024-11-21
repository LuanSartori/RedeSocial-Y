import homeRouter from './homeRouter.js';
import usuariosRouter from "./usuariosRouter.js";
import seguidoresRouter from './seguidoresRouter.js';
import publicacoesRouter from "./publicacoesRouter.js";
import comentariosRouter from './comentariosRouter.js'


// função que indexa todas as pastas de rotas
export default function(app) {
    app.use("/", homeRouter);
    app.use("/usuarios", usuariosRouter);
    app.use("/seguidores", seguidoresRouter);
    app.use("/publicacoes", publicacoesRouter);
    app.use("/comentarios", comentariosRouter);
}
