import styles from "./Register.module.css";
import React, { use } from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    const res = await createUser(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se</h1>
      <p>Corretor, crie seu usuário para cadastrar seus imóveis!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            placeholder="Nome do usuário..."
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
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
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Insira sua senha..."
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading && (
          <button type="submit" className="btn">
            Cadastrar
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

export default Register;
