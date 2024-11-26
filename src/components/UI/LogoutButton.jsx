import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const handleLogout = () => {
    console.log("Cerrando sesión...");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      <LogOut className="w-5 h-5 mr-2" />
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
