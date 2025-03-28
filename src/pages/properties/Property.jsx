import { useParams } from "react-router-dom";
import styles from "./Property.module.css";
import { useFetchDocument } from "../../hooks/useFetchDocument";

function Property() {
  const { id } = useParams();

  const { document: property, loading } = useFetchDocument("properties", id);
  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando imóvel...</p>}
      {property && (
        <>
          <h2>{property.title}</h2>
          <img src={property.image} alt={property.title} />
          <p>{property.body}</p>
          <div className={styles.tags}>
            {property.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Property;
