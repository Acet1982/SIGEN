import axios from "axios";

// Función para hacer solicitudes a la base de datos
export const fetchData = async (url, options = {}) => {
  try {
    const response = await axios.get(url, {
      withCredentials: true,
      ...options,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error);
  }
};

export const postData = async (url, options = {}) => {
  try {
    const response = await axios.post(url, {
      ...options,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error);
  }
};
