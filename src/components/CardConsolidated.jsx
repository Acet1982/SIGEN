import { useEffect, useState } from "react";
import axios from "axios";
import { DollarSign } from "lucide-react";
import { useFetchToken } from "../hooks/useFetchToken";

export const CardConsolidated = ({ endpoint }) => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useFetchToken();

  useEffect(() => {
    if (!token) return;

    const fetchConsolidatedData = async () => {
      try {
        const response = await axios.get(
          `https://sigen-backend-zebi.onrender.com/api/enova/payrolls${endpoint}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1; // Enero = 0
        const currentYear = currentDate.getFullYear();

        const period1Start = new Date(currentYear, currentMonth - 1, 1); // Del 1 al 14
        const period1End = new Date(currentYear, currentMonth - 1, 14);
        const period2Start = new Date(currentYear, currentMonth - 1, 15); // Del 15 al último día del mes
        const period2End = new Date(currentYear, currentMonth, 0);

        // Filtrar datos según el período actual
        const payrolls = response.data.msg;
        const isPeriod1 = currentDay <= 14;
        const currentPeriodPayrolls = payrolls.filter((item) => {
          const createdAt = new Date(item.created_at);
          if (isPeriod1) {
            return createdAt >= period1Start && createdAt <= period1End;
          } else {
            return createdAt >= period2Start && createdAt <= period2End;
          }
        });

        // Sumar total_payable del período actual
        const totalPayable = currentPeriodPayrolls.reduce(
          (sum, item) => sum + parseFloat(item.total_payable),
          0
        );

        setTotal(totalPayable);
      } catch (err) {
        setError(err.response?.data.error || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchConsolidatedData();
  }, [token, endpoint]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex flex-row items-center justify-between pb-2">
        <h2 className="text-sm font-medium">Total Consolidado</h2>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <div className="text-2xl font-bold">
          {total.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
          })}
        </div>
        <p className="text-xs text-muted-foreground">
          Consolidado del período actual
        </p>
      </div>
    </div>
  );
};
