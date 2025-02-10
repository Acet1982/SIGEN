import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { DollarSign } from "lucide-react";
import { useFetchToken } from "../hooks/useFetchToken";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const ComparativeCard = ({ endpoint }) => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useFetchToken();

useEffect(() => {
  if (!token) return;

  const getPayrollData = async () => {
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
      console.log("Datos recibidos:", response.data.msg); // Debug para inspeccionar la estructura
      setPayrolls(response.data.msg);
    } catch (err) {
      setError(err.response?.data.error || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  getPayrollData();
}, [token, endpoint]);


const aggregatePayrollData = () => {
  const dataByPayrollId = {};

  payrolls.forEach((item) => {
    console.log("Procesando ítem:", item); // Verifica cada ítem
    const createdAt = new Date(item.created_at);
    const period = createdAt.getDate() <= 14 ? "Corte1" : "Corte2";
    const payrollId = item.payroll_id;

    if (!dataByPayrollId[payrollId]) {
      dataByPayrollId[payrollId] = { Corte1: 0, Corte2: 0 };
    }

    const value = parseFloat(item.total_payable) || 0; // Validar que sea un número
    dataByPayrollId[payrollId][period] += value; // Sumar valores por período
  });

  console.log("Datos agregados:", dataByPayrollId); // Verifica la agregación
  return dataByPayrollId;
};



  const prepareChartData = () => {
    const aggregatedData = aggregatePayrollData();
    const labels = Object.keys(aggregatedData);
    const corte1Data = labels.map((id) => aggregatedData[id].Corte1);
    const corte2Data = labels.map((id) => aggregatedData[id].Corte2);

    return {
      labels,
      datasets: [
        {
          label: "Corte 1",
          data: corte1Data,
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          tension: 0.4,
        },
        {
          label: "Corte 2",
          data: corte2Data,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          tension: 0.4,
        },
      ],
    };
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = prepareChartData();
  const aggregatedData = aggregatePayrollData();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-row items-center justify-between pb-4">
        <h2 className="text-sm font-medium">Comparativa de Nóminas</h2>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="text-2xl font-bold mb-4">Comparación por Períodos</div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const value = tooltipItem.raw;
                  return `$${value.toLocaleString()}`;
                },
              },
            },
          },
          scales: {
            x: { title: { display: true, text: "ID de Nómina" } },
            y: {
              title: { display: true, text: "Valor en pesos (COP)" },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};
