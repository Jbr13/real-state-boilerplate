import { Link } from "react-router-dom";
import PostDetail from "../../components/PostDetail";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import useQuery from "../../hooks/useQuery";
import styles from "./Search.module.css";

function Search() {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("properties", search);

  return (
    <div className={styles.search_container}>
      <h1>Resultados da pesquisa:</h1>
      {posts && posts.length === 0 && (
        <>
          <Link to="/" className="btn btn-dark">
            Voltar
          </Link>
          <p>Não foram encontrados posts a partir de sua busca</p>
        </>
      )}
      {posts && posts.map((it) => <PostDetail className={styles.search_detail} key={it.id} post={it} />)}
    </div>
  );
}

export default Search;
