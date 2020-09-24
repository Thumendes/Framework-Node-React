import { Router } from "express";
import { v4 as uuid } from "uuid";
import multer from "multer";
import path from "path";

// Configuração do MULTER para upload de imagens
const multerConfig = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "uploads"),
    filename(req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`;

      cb(null, filename);
    },
  }),
};

const upload = multer(multerConfig);
const routes = Router();

// Interface para POST (typescript)
interface IPost {
  id: string;
  name: string;
  content: string;
  imgURL: string;
  comentarios: [] | [{ author: string; content: string }];
}

// Array de POSTS
const posts: IPost[] = [];

routes.get("/post", (req, res) => {
  try {
    // Envio do Array de  POSTS
    console.log(posts);
    return res.json(posts);
  } catch (error) {
    const objReturn = {
      message: "Não foi possível enviar posts",
      error: error.message,
    };

    // status: 500 => erro no servidor e enviar Objeto com o erro
    return res.status(500).json(objReturn);
  }
});

routes.post("/post", upload.single("image"), (req, res) => {
  try {
    // Desetruturação de "strings" do "req.body"
    const { name, content } = req.body;

    /*
      PEGAR O NOME DO ARQUIVO ENVIADO

      Para incrementar na URL de arquivos estáticos
    */
    const { filename } = req.file;

    // Objeto que será adicionado ao Array de Posts
    const newPost: IPost = {
      id: uuid(),
      name,
      content,
      imgURL: `http://192.168.0.36:3001/uploads/${filename}`,
      comentarios: [],
    };

    console.log(newPost);

    posts.push(newPost);

    // status: 201 => Mensagem de sucesso de criação
    return res.status(201);
  } catch (error) {
    const objReturn = {
      message: "Não foi possível criar post",
      error: error.message,
    };

    // status: 500 => erro no servidor e enviar Objeto com o erro
    return res.status(500).json(objReturn);
  }
});

export default routes;
