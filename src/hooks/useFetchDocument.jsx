import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, uid) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Estado para evitar atualização de estado em um componente desmontado
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (cancelled) return;

      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, uid);
        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
        setLoading(false);
      }
    }

    loadDocument();
  }, [docCollection, uid, cancelled]);

  useEffect(() => setCancelled(true), []);

  return { document, loading, error };
};
