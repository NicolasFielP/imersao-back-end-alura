import express from "express";
import routes from "./src/routes/postsRoutes.js";
// Importa o framework Express, que será utilizado para criar a nossa aplicação web.

const app = express();
// Cria uma instância do Express, que será o ponto de partida da nossa aplicação.
routes(app);

app.listen(3000, () => {
    // Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo.
    console.log("Servidor Escutando...");
});

