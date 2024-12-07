import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormLogin } from "./components/FormLogin";
import { FormAddUsers } from "./components/FormAddUsers";
import { Payrolls } from "./pages/Payrolls";
import { Dashboard } from "./pages/Dashboard";
import { Administrators } from "./pages/Administrators";
import { Coordinators } from "./pages/Coordinators";
import { Employees } from "./pages/Employees";
import { Consolidated } from "./pages/Consolidated";
import { Sites } from "./pages/Sites";
import { Settings } from "./pages/Settings";
import { AddPayrollDetail } from "./sections/AddPayrollDetail";
import { LoadPayroll } from "./pages/LoadPayroll";
import { EditPayrollEmployee } from "./sections/EditPayrollEmployee";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/administrators" element={<Administrators />} />
          <Route path="/coordinators" element={<Coordinators />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/payrolls" element={<Payrolls />} />
          <Route path={"/payrolls/details/:pid"} element={<LoadPayroll />} />
          <Route
            path={"/payrolls/details/:pid/employee/:eid"}
            element={<AddPayrollDetail />}
          />
          <Route
            path={"payrolls/details/update/:pdid"}
            element={<EditPayrollEmployee />}
          />
          <Route path="/consolidated" element={<Consolidated />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-Info/:eid" element={<FormAddUsers />} />
          <Route path="/login" element={<FormLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
