import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFetchToken } from "../hooks/useFetchToken.jsx";
import { fetchData } from "../hooks/fetchData.jsx";

const URL_PD = `https://sigen-backend-zebi.onrender.com/api/enova/payrolls/details/`;

export const TopEmployees = () => {
  const token = useFetchToken();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const loadPayrollDetail = async () => {
      try {
        const result = await fetchData(URL_PD, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Ordenar por `total_payable` y seleccionar los 5 primeros
        const sortedData = result.msg
          .sort(
            (a, b) => parseFloat(b.total_payable) - parseFloat(a.total_payable)
          )
          .slice(0, 5);

        setData(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPayrollDetail();
  }, [token]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  // Calcular el máximo valor para normalizar las barras
  const maxSalary = Math.max(
    ...data.map((employee) => parseFloat(employee.total_payable))
  );

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg items-center gap-6 h-full">
      <h2 className="text-xl font-bold">Top 5 Empleados - Corte</h2>
      <div className="w-full max-w-2xl">
        {data.map((employee) => (
          <div key={employee.pdid} className="flex flex-col items-center mb-4">
            <div
              className="bg-blue-500 text-white text-center py-1 rounded-lg"
              style={{
                width: `${
                  (parseFloat(employee.total_payable) / maxSalary) * 100
                }%`,
                transition: "width 0.3s ease",
              }}
            >
              ${parseFloat(employee.total_payable).toLocaleString("es-CO")}
            </div>
            <span className="text-sm text-gray-700 mt-1">
              {employee.user_name} {employee.last_name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

TopEmployees.propTypes = {
  enpoint: PropTypes.string,
};
