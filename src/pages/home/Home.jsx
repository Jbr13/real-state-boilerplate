// CSS
import styles from "./Home.module.css";

// hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// components
import PostDetail from "../../components/PostDetail";

function Home() {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("properties");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`search/?q=${query}`);
    }
  };
  return (
    <div className={styles.home}>
      <h1>Veja nossos imóveis mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          name=""
          placeholder="Ou busque por imóveis de seu interesse"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        <div className={styles.postContainer}>
          {posts &&
            posts.map((post) => <PostDetail key={post.id} post={post} />)}
        </div>
        {posts && posts.length === 0 && (
          <div className={styles.nopost}>
            <p>Ainda não há imóveis</p>
            <Link className="btn" to="/properties/createProperty">
              Criar primeiro imóvel agora
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
