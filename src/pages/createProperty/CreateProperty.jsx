import styles from "./CreateProperty.module.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useInsertDocument } from "../../hooks/useInsertDocuments";
import { useAuthValue } from "../../context/AuthContext";

function CreateProperty() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("properties");

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

    await insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
  };

  return (
    <div className={styles.createProperty}>
      <h2>Criar imóvel</h2>
      <p>
        Adicione informações relevantes para que seus clientes possam encontrar
        os imóveis dos sonhos.
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
            Cadastrar
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
    </div>
  );
}

export default CreateProperty;
