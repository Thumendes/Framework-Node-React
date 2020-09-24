import Form from "../components/Form";
import style from "../styles/Home.module.scss";
import { FiSend } from "react-icons/fi";
import api from "../services/api";
import { FormEvent } from "react";

const Home = ({ data }) => {
  const handleCommentSubmit = async (event: FormEvent) => {
    event.preventDefault();
    alert("Comentário");
  };

  return (
    <main className={style.container}>
      <div>
        <div className={style.card}>
          <h1 className={style.title}>Criar publicação</h1>
          <Form />
        </div>
        {data.length === 0 ? (
          <div className={style.card}>
            <p>Adicione uma puplicação para aparecer</p>
          </div>
        ) : (
          data.map((post) => (
            <div className={style.card} key={post.id}>
              <img
                src={post.imgURL}
                alt={post.name}
                className={style.postImage}
              />
              <b>{post.name}</b>
              <p>{post.content}</p>
              <form
                onSubmit={handleCommentSubmit}
                className={style.commentForm}
              >
                <input type="text" placeholder="Comentário..." />
                <button>
                  <FiSend />
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export const getServerSideProps = async () => {
  const { data } = await api.get(`post`);

  return { props: { data } };
};

export default Home;
