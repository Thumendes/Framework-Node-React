import Form from "../components/Form";
import style from "../styles/Home.module.scss";
import api from "../services/api";
import Post from "../components/Post";

const Home = ({ data }) => {
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
              <Post data={post} />
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
