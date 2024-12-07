import { useState, useEffect } from "react";
import { fetchData } from "./fetchData";

const URL_API = "https://sigen-backend-zebi.onrender.com/api/enova/payrolls/";

export const useFetchData = (endpoint, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(token);
  console.log("hola kaiser");

  useEffect(() => {
    if (!token) return;

    const loadUsers = async () => {
      try {
        const result = await fetchData(`${URL_API}$"review"`, {
          withCredentials: true,
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
