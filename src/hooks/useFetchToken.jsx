import { useState, useEffect } from "react";
import { fetchData } from "./fetchData";

const URL_USERS = "http://localhost:5000/api/enova/users/";

export const useFetchToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const resToken = async () => {
      try {
        const response = await fetchData(`${URL_USERS}refresh`, {
          withCredentials: true,
        });
        setToken(response.token);
      } catch (error) {
        console.error("Error al obtener el token:", error);
      }
    };

    resToken();
  }, []);

  return token;
};
