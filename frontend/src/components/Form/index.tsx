import { FormEvent, useRef, useState } from "react";
import api from "../../services/api";
import InputDropzone from "../InputDropzone";
import style from "./style.module.scss";
import { useRouter } from "next/router";

const Form = () => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [file, setFile] = useState<File>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = new FormData();
    const nameValue = nameRef.current.value;
    const contentValue = contentRef.current.value;

    if (!Boolean(nameValue) || !Boolean(contentValue) || !file) {
      return alert("Digite alguma coisa e adicione uma imagem");
    }

    data.append("name", nameRef.current.value);
    data.append("content", contentRef.current.value);
    data.append("image", file);

    const response = await api.post("post", data);

    console.log("hello");
  }

  return (
    <form onSubmit={handleSubmit} className={style.container}>
      <div className={style.inputGroup}>
        <label htmlFor="name">Título</label>
        <input type="text" ref={nameRef} />
      </div>
      <div className={style.inputGroup}>
        <label htmlFor="content">Conteúdo</label>
        <textarea ref={contentRef} />
      </div>
      <div className={style.inputGroup}>
        <label>Imagem</label>
        <InputDropzone handleOnDrop={setFile} />
      </div>
      <div className={style.inputGroup}>
        <button>Enviar</button>
      </div>
    </form>
  );
};

export default Form;
