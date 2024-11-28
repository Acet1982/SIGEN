import { useState } from "react";
import PropTypes from "prop-types";
import { MenuIcon, MenuSquareIcon } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { ButtonBurger } from "../components/UI/ButtonBurger";
import { Header } from "../components/Header";

export const Layout = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-6">
      {/* Sidebar */}
      <div
        className={`fixed lg:static w-[75%] md:w-[50%] lg:w-full top-0 z-50 bg-white transition-all ${
          sidebar ? "-left-0 overflow-y-scroll" : "-left-full"
        } w-full h-full col-span-1 p-6 border-r`}
      >
        <Sidebar />
      </div>

      {/* Botón menú movil */}
      <ButtonBurger onClick={handleSidebar}>
        {sidebar ? <MenuIcon /> : <MenuSquareIcon />}
      </ButtonBurger>

      {/* Content */}
      <div className="col-span-5">
        <Header />
        <div className="h-[680px] p-4 md:p-8 lg:p-12 bg-gray-100">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
