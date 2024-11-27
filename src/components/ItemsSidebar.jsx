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
import { Link } from "react-router-dom";

export const ItemsSidebar = () => {
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
        <Link
          to="/logout"
          className="flex items-center gap-2 hover:bg-purple-600 p-3 text-gray-500 hover:text-white rounded-lg transition-colors duration-300 font-semibold"
        >
          <LogOut size={"18px"} />
          LogOut
        </Link>
      </div>
    </>
  );
};
