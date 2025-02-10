import { Link } from "react-router-dom";
import { Bell, ChevronDown, Dot } from "lucide-react";
import { InputSearch } from "./UI/InputSearch";
import { useEffect, useState } from "react";
import { useFetchToken } from "../hooks/useFetchToken";
import axios from "axios";

export const Header = () => {
  const token = useFetchToken();
  const [profile, setProfile] = useState(null);

  // Función para cargar el perfil del usuario
  useEffect(() => {
    const Profile = async () => {
      if (!token) return;
      try {
        const response = await axios.get(
          "https://sigen-backend-zebi.onrender.com/api/enova/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setProfile(response.data);
      } catch (error) {
        console.log(error.response.error);
      }
    };
    Profile();
  }, [token]);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 md:px-8 lg:px-12">
      {/* Buscador*/}
      <form className="w-full md:w-[50%] lg:w-[30%] order-1 md:order-none ">
        <InputSearch
          placeholder="Buscar aquí..."
          rounded={"rounded-2xl"}
          colorIcons={"text-gray-300"}
        />
      </form>

      {/* Notificaciones y menú */}
      <nav className="w-full md:w-[60%] lg:w-[70%] flex justify-center md:justify-end">
        <ul className="flex items-center gap-4">
          <li>
            <Link to="/" className="relative">
              <Bell size={"18px"} />
              <Dot
                className=" text-xs absolute -right-4 -top-4  text-red-500"
                size={"40px"}
              />
            </Link>
          </li>
          {profile && (
            <li key={profile.uid}>
              <Link className="flex items-center gap-1">
                {`${profile.username} ${profile.lastname}`}{" "}
                <ChevronDown size={"18px"} />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
