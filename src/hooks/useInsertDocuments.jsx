import { useState, useReducer, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Estado inicial do reducer, indicando que a requisição ainda não começou
const initialState = {
  loading: null, // Indica se a requisição está em andamento
  error: null,   // Guarda mensagens de erro caso ocorram
};

// Função reducer que controla o estado da requisição
const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null }; // Indica que a requisição começou
    case "INSERTED_DOC":
      return { loading: false, error: null }; // Indica que a inserção foi bem-sucedida
    case "ERROR":
      return { loading: false, error: action.payload }; // Armazena a mensagem de erro
    default:
      return state; // Retorna o estado inalterado se a ação não for reconhecida
  }
};

// Hook personalizado para inserir documentos no Firestore
export const useInsertDocument = (docCollection) => {
  // useReducer gerencia o estado da requisição
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // Estado para evitar atualização de estado em um componente desmontado
  const [cancelled, setCancelled] = useState(false);

  // Função auxiliar que impede o dispatch caso o componente tenha sido desmontado
  const checkCancelledBeforeDispatch = (action) => {
    if (!cancelled) { 
      dispatch(action); // Apenas executa o dispatch se o componente ainda estiver montado
    }
  };

  // Função assíncrona que insere um documento no Firestore
  const insertDocument = async (document) => {
    checkCancelledBeforeDispatch({ type: "LOADING" }); // Define o estado como "carregando"

    try {
      // Cria um novo documento, adicionando a data/hora atual
      const newDocument = { ...document, createdAt: Timestamp.now() };
      console.log("Dados sendo enviados para Firestore:", newDocument);


      // Insere o documento na coleção especificada no Firestore
      const insertedDocument = await addDoc(
        collection(db, docCollection), 
        newDocument
      );

      // Atualiza o estado para indicar que a inserção foi concluída com sucesso
      checkCancelledBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument, // Retorna o documento inserido (caso necessário)
      });
    } catch (error) {
      console.error("Erro ao inserir documento:", error);
      // Atualiza o estado em caso de erro
      checkCancelledBeforeDispatch({
        type: "ERROR",
        payload: error.message, // Captura e armazena a mensagem do erro
      });
    }
  };

  // useEffect para definir o estado "cancelled" como true quando o componente for desmontado
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  // Retorna a função de inserção e o estado da requisição
  return { insertDocument, response };
};
