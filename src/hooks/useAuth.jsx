// important to have in mind that the users that are autheticated in our system are not saved in our DB, it's saved in another service of the firebase
import { app, db } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuth = () => {
  const [error, setErrors] = useState(null);
  const [loading, setLoading] = useState(null);

  // cleanUp, usefull to deal with memory leak (functions  that are still being executed in background)
  const [cancelled, setCancelled] = useState(false);

  // Retrieve the authentication, with this, we can use auth functions
  const auth = getAuth(app);

  function checkIfIsCancelled() {
    if (cancelled) return;
  }

  // register

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // update username after creating user (firebase requirements)
      await updateProfile(user, { displayName: data.displayName });

      setLoading(false);
      setErrors(null);

      return user;
    } catch (error) {
      setErrors(null);

      let systemErrorMessage;

      if (error.message.includes("auth/weak-password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage =
          "Ocorreu um erro, favor entrar em contato com o suporte";
      }

      setLoading(false);
      setErrors(systemErrorMessage);
    }
  };

  // logout
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  // login
  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setErrors(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(true);
    } catch (error) {
      let systemErrorMessage;
      
      if (
        error.message.includes("user-not-foung") ||
        error.message.includes("invalid-credential")
      ) {
        systemErrorMessage = "Usuário ou senha incorreto.";
      } else {
        systemErrorMessage =
          "Favor entrar em contato com o suporte ou aguarde e tente novamente.";
      }

      setErrors(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Avoid memory leak
    return () => setCancelled(true);
  }, []);

  return { auth, createUser, error, loading, logout, login };
};
