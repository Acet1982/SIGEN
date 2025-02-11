import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export const FormAddUser = () => {
  const [formData, setFormData] = useState({
    userName: "",
    lastName: "",
    idNumber: "",
    cellphone: "",
    cellphoneContact: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Obtén el token desde las cookies
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("refreshtoken="))
        ?.split("=")[1];

      if (!token) {
        Swal.fire({
          title: "Error",
          text: "Token no encontrado en las cookies.",
          icon: "error",
        });
        setIsLoading(false);
        return;
      }

      // Realiza la solicitud con el Bearer Token
      const response = await axios.post(
        "https://sigen.onrender.com/users",
        {
          ...formData,
          imagePath: "", // Campo opcional
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Éxito!",
        text: response.data.msg,
        icon: "success",
      });

      setIsLoading(false);
      navigate("/users");
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.error || "No se pudo conectar con el servidor.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Agregar Usuario
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Ingresa los datos para crear un nuevo usuario.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cédula
            </label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Celular
            </label>
            <input
              type="text"
              name="cellphone"
              value={formData.cellphone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Celular de Contacto (Opcional)
            </label>
            <input
              type="text"
              name="cellphoneContact"
              value={formData.cellphoneContact}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              disabled={isLoading}
            >
              {isLoading ? "Guardando..." : "Agregar Usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
