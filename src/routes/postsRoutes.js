// Importa o framework Express para criar o servidor web e definir rotas
import express from "express";

// Importa o módulo Multer para lidar com uploads de arquivos (imagens, neste caso)
import multer from "multer";

// Importa funções controladoras de posts de um arquivo externo (provavelmente postsController.js)
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

// Configura o armazenamento para arquivos carregados usando Multer
const storage = multer.diskStorage({
  // Define o diretório de destino para arquivos carregados
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Armazena na pasta 'uploads'
  },
  // Define o nome do arquivo carregado
  filename: function (req, file, cb) {
    cb(null, file.originalname);  // Mantém o nome original
  }
});

// Cria uma instância do middleware Multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads", storage }); // Define o destino e usa a configuração 'storage'

// Define uma função para configurar rotas da aplicação
const routes = (app) => {
  // Habilita o middleware express.json() para interpretar dados JSON na requisição
  app.use(express.json());

  // Rota GET para listar posts (provavelmente busca dados do banco)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (provavelmente salva dados no banco)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem
  // Usa o middleware 'upload.single("imagem")' para lidar com um único arquivo chamado "imagem"
  // Após upload bem-sucedido, chama a função 'uploadImagem' para processar a imagem
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id",atualizarNovoPost)
};

// Exporta a função 'routes' como padrão para uso em outras partes da aplicação
export default routes;