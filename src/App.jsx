import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormLogin } from "./components/FormLogin";
import { Payrolls } from "./pages/Payrolls";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Payrolls />} />
          <Route path="/login" element={<FormLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
