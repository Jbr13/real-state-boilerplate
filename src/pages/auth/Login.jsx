import styles from "./Login.module.css";
import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { error: authError, loading, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };
    
    const res = await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Entre agora para criar um novo anúncio de seu imóvel!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            placeholder="E-mail do usuário..."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Insira sua senha..."
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {!loading && (
          <button type="submit" className="btn">
            Entrar
          </button>
        )}
        {loading && (
          <button type="submit" className="btn" disabled>
            Aguarde
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default login;
