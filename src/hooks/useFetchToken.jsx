import { useState, useEffect } from "react";
import { fetchData } from "./fetchData";

export const useFetchToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const resToken = async () => {
      try {
        const response = await fetchData(
          `http://localhost:5000/api/enova/users/refresh`,
          {
            withCredentials: true,
          }
        );
        setToken(response.token);
      } catch (error) {
        console.error("Error al obtener el token:", error);
      }
    };

    resToken();
  }, []);

  return token;
};
