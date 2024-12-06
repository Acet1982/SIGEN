import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ChartPie,
  Bolt,
  FileChartColumn,
  LayoutDashboard,
  LogOut,
  UserCog,
  Users,
  MapPinHouse,
  UserPen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFetchToken } from "../hooks/useFetchToken";

export const ItemsSidebar = () => {
  const token = useFetchToken();
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);

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
        console.log(error.response.data.error);
      }
    };
    Profile();
  }, [token]);

  // Función para realizar el logout
  const logOut = async () => {
    await axios.get(
      `https://sigen-backend-zebi.onrender.com/api/enova/users/logout`,
      {
        withCredentials: true,
      }
    );
    navigate("/");
  };

  return (
    <>
      {/* Menú de navegación del sidebar */}
      <nav>
        <ul>
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 hover:bg-purple-600 p-3 text-gray-500 hover:text-white rounded-lg transition-colors duration-300 text-md font-semibold mt-2"
            >
              <LayoutDashboard size={"18px"} />
              Dashboard
            </Link>
          </li>

          {profile.role_id === 1 && (
            <>
              <li>
                <Link
                  to="/administrators"
                  className="flex items-center gap-2 hover:bg-purple-600 p-3 text-gray-500 hover:text-white rounded-lg transition-colors duration-300 font-semibold mt-1"
                >
                  <UserCog size={"18px"} />
                  Administrators
                </Link>
              </li>

              <li>
                <Link
                  to="/coordinators"
                  className="flex items-center gap-2 hover:bg-purple-600 p-3 text-gray-500 hover:text-white rounded-lg transition-colors duration-300 font-semibold mt-1"
                >
                  <UserPen size={"18px"} />
                  Coordinators
                </Link>
              </li>
              <li>
                <Link
                  to="/consolidated"
                  className="flex items-center gap-2 hover:bg-purple-600 p-3 text-gray-500 hover:text-white rounded-lg transition-colors duration-300 font-semibold mt-1"
                >
                  <ChartPie size={"18px"} />
                  Consolidated
                </Link>
              </li>

              <li>
                <Link
                  to="/sites"
                  className="flex items-center gap-2 hover:bg-purple-600 p-3 text-gray-500 hover:text-white rounded-lg transition-colors duration-300 font-semibold mt-1"
                >
                  <MapPinHouse size={"18px"} />
                  Sites
                </Link>
              </li>
            </>
          )}

          <li>
            <Link
              to="/employees"
              className="flex items-center gap-2 hover:bg-purple-600 p-3 text-gray-500 hover:text-white rounded-lg transition-colors duration-300 font-semibold mt-1"
            >
              <Users size={"18px"} />
              Employees
            </Link>
          </li>

          <li>
            <Link
              to="/payrolls"
              className="flex items-center gap-2 hover:bg-purple-600 p-3 text-gray-500 hover:text-white rounded-lg transition-colors duration-300 font-semibold mt-1"
            >
              <FileChartColumn size={"18px"} />
              Payrolls
            </Link>
          </li>
        </ul>
      </nav>

      {/* Contenedor del botón cerrar sesión */}
      <div className="flex flex-col gap-4 border-t">
        <Link
          to="/settings"
          className="flex items-center gap-2 hover:bg-purple-600 p-3 text-gray-500 hover:text-white rounded-lg transition-colors duration-300 font-semibold mt-1"
        >
          <Bolt size={"18px"} />
          Ajustes
        </Link>
        <button
          onClick={logOut}
          className="flex items-center gap-2 hover:bg-purple-600 p-3 text-gray-500 hover:text-white rounded-lg transition-colors duration-300 font-semibold"
        >
          <LogOut size={"18px"} />
          LogOut
        </button>
      </div>
    </>
  );
};
