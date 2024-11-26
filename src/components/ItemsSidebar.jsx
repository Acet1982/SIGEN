import { Bolt, LayoutDashboard, LogOut, UserCog, Users } from "lucide-react";
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
              className="flex items-center gap-2 hover:bg-purple-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold"
            >
              <LayoutDashboard />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 hover:bg-purple-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold"
            >
              <UserCog />
              Administrator
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 hover:bg-purple-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold"
            >
              <Users />
              Coordinators
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 hover:bg-purple-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold"
            >
              <LayoutDashboard />
              Payrolls
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 hover:bg-purple-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold"
            >
              <LayoutDashboard />
              Consolidated
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 hover:bg-purple-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold"
            >
              <LayoutDashboard />
              Sites
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 hover:bg-purple-600 p-4 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold"
            >
              <LayoutDashboard />
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>

      {/* Contenedor del botón cerrar sesión */}
      <div className="flex flex-col gap-4 border-t">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 hover:bg-purple-600 p-3 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold mt-1"
        >
          <Bolt />
          Ajustes
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 hover:bg-purple-600 p-3 text-gray-500 hover:text-white rounded-lg transition-colors font-semibold"
        >
          <LogOut />
          LogOut
        </Link>
      </div>
    </>
  );
};
