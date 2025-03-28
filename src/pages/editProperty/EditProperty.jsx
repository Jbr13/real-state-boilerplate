import styles from "./EditProperty.module.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

function EditProperty() {
  const { id } = useParams();
  const { document: property } = useFetchDocument("properties", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (property) {
      setTitle(property.title);
      setBody(property.body);
      setImage(property.image);

      const propertyTags = property.tagsArray.join(", ");

      setTags(propertyTags);
    }
  }, [property]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("properties");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // validar URL

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL valida...");
    }

    if (formError) {
      console.log(formError);
      return;
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos");
    }

    setTags(tagsArray);

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_property}>
      {property && (
        <>
          <h2>Editar imóvel</h2>
          <p>
            As informações do seu imóvel mudaram? sem problemas, apenas atualize
            nos campos abaixo.
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Rua, bairro, cidade de seu imóvel"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da imagem</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem que represente seu post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              className={styles.preview_image}
              src={property.image}
              alt={styles.title}
            />
            <label>
              <span>Conteúdo</span>
              <textarea
                name="body"
                required
                placeholder="Insira as informações de seu imóvel"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as # separadas por virgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && (
              <button type="submit" className="btn">
                Salvar
              </button>
            )}
            {response.loading && (
              <button type="submit" className="btn" disabled>
                Aguarde
              </button>
            )}
            {response.error ? (
              <p className="error">{response.error}</p>
            ) : formError ? (
              <p className="error">{formError}</p>
            ) : (
              <p>Enviado com sucesso</p>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default EditProperty;
