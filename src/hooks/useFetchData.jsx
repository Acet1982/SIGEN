import { useState, useEffect } from "react";
import { fetchData } from "./fetchData";

const URL_API = "http://localhost:5000/api/enova/";

export const useFetchData = (endpoint, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const loadUsers = async () => {
      try {
        const result = await fetchData(`${URL_API}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [endpoint, token]);

  return { data, loading, error };
};
