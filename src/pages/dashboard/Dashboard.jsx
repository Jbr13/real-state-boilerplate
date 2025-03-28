import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments.jsx";
import { useAuthValue } from "../../context/AuthContext.jsx";
import { useDeleteDocument } from "../../hooks/useDeleteDocument.jsx";

function Dashboard() {
  const { user } = useAuthValue();
  const uid = user.uid;
  console.log(user);

  const { deleteDocument } = useDeleteDocument("properties");

  // users properties
  const { documents: properties, loading } = useFetchDocuments(
    "properties",
    null,
    uid
  );

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie suas propriedades</p>
      {properties && properties.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/properties/createProperty" className="btn">
            Criar primeiro imóvel
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ação</span>
          </div>
          {properties &&
            properties.map((property) => (
              <div key={property.id} className={styles.post_row}>
                <p>{property.title}</p>
                <div>
                  <Link
                    to={`/properties/${property.id}`}
                    className="btn btn-outline"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/properties/edit/${property.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteDocument(property.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default Dashboard;
