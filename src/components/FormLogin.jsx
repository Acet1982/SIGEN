import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ButtonSingle } from "./UI/ButtonSingle";
import { InputPassword } from "./UI/InputPassword";
import { InputSingle } from "./UI/InputSingle";
import axios from "axios";

// const URL_USERS = "http://localhost:5000/api/enova/users/";

export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const Auth = async (e) => {
    e.preventDefault();

    if (!email) return setError("El correo es requerido.");
    if (!password) return setError("La contraseña es requerida.");
    setError("");

    try {
      await axios.post(
        "https://sigen-backend-zebi.onrender.com/api/enova/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.error);
      } else {
        setMsg("Error en el servidor");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-500 text-white py-8 px-6 text-center">
          <h1 className="text-3xl font-bold">Bienvenido a SIGEN</h1>
          <p className="text-sm mt-2">
            Sistema de gestión de nóminas integrado.
          </p>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Iniciar Sesión
          </h2>
          {msg || error ? (
            <p className="text-red-500 text-center text-sm mb-4 animate-pulse">
              {msg || error}
            </p>
          ) : null}

          <form onSubmit={Auth} className="flex flex-col gap-4">
            <InputSingle
              type="email"
              label="Correo"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-gray-300 focus:ring focus:ring-blue-200"
            />
            <InputPassword
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-gray-300 focus:ring focus:ring-blue-200"
            />
            <ButtonSingle
              label="Iniciar Sesión"
              type="submit"
              className="w-full py-3 mt-4 text-white font-semibold bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            />
          </form>
        </div>

        <div className="bg-gray-100 text-gray-600 py-4 text-center text-xs">
          © 2024 Academia Enova Tecnologia. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
};
