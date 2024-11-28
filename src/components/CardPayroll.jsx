import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFetchToken } from "../hooks/useFetchToken";

export const CardPayroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const token = useFetchToken();

  console.log(token);
  useEffect(() => {
    if (!token) return;
    const getPayrolls = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/enova/payrolls/review",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Datos de nómina:", response.data);
        setPayrolls(response.data.msg);
      } catch (error) {
        console.error(
          "Error al obtener la nómina:",
          error.response?.data.error
        );
      }
    };

    getPayrolls();
  }, [token]);

  return (
    <>
      {payrolls.map((payroll) => (
        <Link
          key={payroll.pid}
          to="/hola"
          className="bg-white rounded-3xl p-8 flex flex-col md:flex-row gap-8 w-full drop-shadow-lg cursor-pointer border-2 border-transparent hover:border-purple-400 transition-all mb-4"
        >
          {/* Imagén de nómina */}
          <div className="w-full md:w-[10%] bg-purple-100 rounded-lg flex items-center justify-center">
            <img src="Payroll.svg" className="p-1" alt="IlustrationsPayroll" />
          </div>

          {/* Título e información de nómina */}
          <div className="w-full md:w-[70%]">
            <h1 className="text-xl flex items-center gap-4 mb-2 text-black font-semibold">
              Nómina {payroll.site_name}
              <span className="text-xs py-1 px-2 bg-purple-100 text-purple-600 font-bold rounded-md">
                {payroll.period_name}
              </span>
              <span
                className={`text-xs py-1 px-2  ${
                  payroll.state_id === 1
                    ? "bg-orange-100 text-orange-600"
                    : payroll.state_id === 2
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }  font-bold rounded-md`}
              >
                {payroll.state_name}
              </span>
            </h1>
            <p className="text-gray-500">Por: {payroll.coordinator_name}</p>
          </div>

          {/* Fecha de nómina */}
          <div className="w-full md:w-[20%]">
            <h3 className="text-xl text-gray-500 mb-2">SIGEN 2024</h3>
            <p className="text-gray-500">
              {new Intl.DateTimeFormat("es-ES", {
                day: "numeric",
                month: "long",
              }).format(new Date(payroll.payroll_date))}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
};

CardPayroll.propTypes = {
  endpoint: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired, // Validamos que el token sea obligatorio
};
