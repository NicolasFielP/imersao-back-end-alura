import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
// Importa a função `conectarAoBanco` do arquivo `dbConfig.js`, responsável por estabelecer a conexão com o banco de dados.

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Cria uma conexão com o banco de dados utilizando a string de conexão fornecida pela variável de ambiente `STRING_CONEXAO`. A palavra-chave `await` indica que a função `conectarAoBanco` é assíncrona e precisamos esperar a conexão ser estabelecida antes de continuar.


export async function getTodosPosts() {
    // Define uma função assíncrona para buscar todos os posts do banco de dados.
    const db = conexao.db("imersao-instabytes");
    // Seleciona o banco de dados com o nome "imersao-instabytes".
    const colecao = db.collection("posts");
    // Seleciona a coleção "posts" dentro do banco de dados.
    return colecao.find().toArray();
    // Executa a consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados como um array.
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost});
}