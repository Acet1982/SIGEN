import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormLogin } from "./components/FormLogin";
import { FormAddUsers } from "./components/FormAddUsers";
import { Payrolls } from "./pages/Payrolls";
import { Index } from "./pages";
import { Dashboard } from "./pages/Dashboard";
import { Administrators } from "./pages/Administrators";
import { Coordinators } from "./pages/Coordinators";
import { Employees } from "./pages/Employees";
import { Consolidated } from "./pages/Consolidated";
import { Sites } from "./pages/Sites";
import { Settings } from "./pages/Settings";
import { SelectInputClass } from "./components/UI/SelectInputClass";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/administrators" element={<Administrators />} />
          <Route path="/coordinators" element={<Coordinators />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/payrolls" element={<Payrolls />} />
          <Route path="/consolidated" element={<Consolidated />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-users" element={<FormAddUsers />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/prueba" element={<SelectInputClass />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
