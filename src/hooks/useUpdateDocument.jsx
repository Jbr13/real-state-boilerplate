import { useState, useReducer, useEffect } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

// Estado inicial do reducer, indicando que a requisição ainda não começou
const initialState = {
  loading: null, // Indica se a requisição está em andamento
  error: null, // Guarda mensagens de erro caso ocorram
};

// Função reducer que controla o estado da requisição
const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null }; // Indica que a requisição começou
    case "UPDATED_DOC":
      return { loading: false, error: null }; // Indica que a inserção foi bem-sucedida
    case "ERROR":
      return { loading: false, error: action.payload }; // Armazena a mensagem de erro
    default:
      return state; // Retorna o estado inalterado se a ação não for reconhecida
  }
};

// Hook personalizado para inserir documentos no Firestore
export const useUpdateDocument = (docCollection) => {
  // useReducer gerencia o estado da requisição
  const [response, dispatch] = useReducer(updateReducer, initialState);

  // Estado para evitar atualização de estado em um componente desmontado
  const [cancelled, setCancelled] = useState(false);

  // Função auxiliar que impede o dispatch caso o componente tenha sido desmontado
  const checkCancelledBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action); // Apenas executa o dispatch se o componente ainda estiver montado
    }
  };

  // Função assíncrona que insere um documento no Firestore
  const updateDocument = async (id, data) => {
    checkCancelledBeforeDispatch({ type: "LOADING" });
    try {
      const docRef = await doc(db, docCollection, id);

      const updatedDocument = await updateDoc(docRef, data);

      checkCancelledBeforeDispatch({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument, // Retorna o documento inserido (caso necessário)
      });
    } catch (error) {
      console.error("Erro ao editar documento:", error);
      checkCancelledBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { updateDocument, response };
};
