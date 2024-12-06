import { TitlePages } from "./UI/TittlePages";
import { ButtonSingle } from "./UI/ButtonSingle";
import { InputSingle } from "./UI/InputSingle";
import { InputSelectBanks } from "./UI/InputSelectBanks";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useFetchToken } from "../hooks/useFetchToken";
import Swal from "sweetalert2";

export const FormAddUsers = () => {
  const navigate = useNavigate();
  const token = useFetchToken();
  const location = useLocation();
  const uid = location.pathname.split("/")[4];
  const [bank_id, setBank_Id] = useState(0);
  const [account_number, setAccount_Number] = useState(0);
  const [monthly_salary, setMonthly_Salary] = useState(0);

  const LoadInfoEmployee = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/enova/employees/create/${uid}`,
        { user_id: uid, bank_id, account_number, monthly_salary },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Exito!",
        text: response.data.msg,
        icon: "success",
      });
      navigate("/employees");
    } catch (error) {
      Swal.fire({
        title: "Fallo!",
        text: error.response.data.error,
        icon: "error",
      });
    }
  };
  return (
    <div className="w-[450px] m-auto border-1 p-4 rounded-2xl text-center">
      <TitlePages title="Registrar información de empleados" />
      <form className="flex flex-col gap-3 ">
        <p>Seleccione un banco</p>
        <InputSelectBanks
          value={bank_id}
          onChange={(e) => setBank_Id(e.target.value)}
        />
        <InputSingle
          label="Número de cuenta"
          placeholder={"Ingrese el número de cuenta"}
          value={account_number}
          onChange={(e) => setAccount_Number(e.target.value)}
        />
        <InputSingle
          label="Honorarios Mensuales"
          placeholder="Ingrese los honorarios Mensuales"
          value={monthly_salary}
          onChange={(e) => setMonthly_Salary(e.target.value)}
        />
        <ButtonSingle
          onClick={LoadInfoEmployee}
          label="Registrar datos del empleado"
        />
      </form>
    </div>
  );
};
