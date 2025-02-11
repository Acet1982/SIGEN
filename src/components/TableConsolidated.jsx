import { useState, useEffect } from "react";
import { useFetchToken } from "../hooks/useFetchToken.jsx";
import { fetchData } from "../hooks/fetchData.jsx";
import { useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const URL_PD = `https://sigen.onrender.com/api/enova/payrolls/details/`;

export const TableConsolidated = () => {
  const token = useFetchToken();
  const [data, setData] = useState(null);
  const [totals, setTotals] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const pid = location.pathname.split("/")[3];
  const formatCC = (value) => new Intl.NumberFormat("es-CO").format(value || 0);

    useEffect(() => {
      if (!token) return;

      const loadPayrollDetail = async () => {
        try {
          const result = await fetchData(`${URL_PD}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const payrollDetails = result.msg;

          // Calcular totales
          const calculatedTotals = payrollDetails.reduce(
            (acc, pd) => {
              acc.days_worked += Number(pd.days_worked || 0);
              acc.days_sunday += Number(pd.days_sunday || 0);
              acc.value_days_sunday += Number(pd.value_days_sunday || 0);
              acc.sunday_classes += Number(pd.sunday_classes || 0);
              acc.value_sunday_classes += Number(pd.value_sunday_classes || 0);
              acc.instructor_hours += Number(pd.instructor_hours || 0);
              acc.value_instructor_hours += Number(
                pd.value_instructor_hours || 0
              );
              acc.registrations += Number(pd.registrations || 0);
              acc.value_registrations += Number(pd.value_registrations || 0);
              acc.additional_payments += Number(pd.additional_payments || 0);
              acc.deductions += Number(pd.deductions || 0);
              acc.total_payable += Number(pd.total_payable || 0);
              return acc;
            },
            {
              days_worked: 0,
              days_sunday: 0,
              value_days_sunday: 0,
              sunday_classes: 0,
              value_sunday_classes: 0,
              instructor_hours: 0,
              value_instructor_hours: 0,
              registrations: 0,
              value_registrations: 0,
              additional_payments: 0,
              deductions: 0,
              total_payable: 0,
            }
          );

          setData(payrollDetails);
          setTotals(calculatedTotals);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      loadPayrollDetail();
    }, [token, pid]);

    const downloadExcel = () => {
      const dataForExport = data.map((pd) => ({
        Nombre: pd.user_name,
        Apellido: pd.last_name,
        Cédula: pd.cc,
        Banco: pd.bank_name,
        "Número de cuenta": pd.account_number,
        "Días trabajados": pd.days_worked,
        "Días dominicales": pd.days_sunday,
        "Valor días dominicales": pd.value_days_sunday,
        "Clases dominicales": pd.sunday_classes,
        "Valor clases dominicales": pd.value_sunday_classes,
        "Horas instructor": pd.instructor_hours,
        "Valor hora instructor": pd.value_instructor_hours,
        Inscripciones: pd.registrations,
        "Valor inscripción": pd.value_registrations,
        "Saldos adicionales": pd.additional_payments,
        Deducciones: pd.deductions,
        "Total a pagar": pd.total_payable,
        Observaciones: pd.observations,
      }));

      // Añadir los totales al final del archivo
      dataForExport.push({
        Nombre: "Totales",
        Apellido: "",
        Cédula: "",
        Banco: "",
        "Número de cuenta": "",
        "Días trabajados": totals.days_worked,
        "Días dominicales": totals.days_sunday,
        "Valor días dominicales": totals.value_days_sunday,
        "Clases dominicales": totals.sunday_classes,
        "Valor clases dominicales": totals.value_sunday_classes,
        "Horas instructor": totals.instructor_hours,
        "Valor hora instructor": totals.value_instructor_hours,
        Inscripciones: totals.registrations,
        "Valor inscripción": totals.value_registrations,
        "Saldos adicionales": totals.additional_payments,
        Deducciones: totals.deductions,
        "Total a pagar": totals.total_payable,
        Observaciones: "",
      });

      const worksheet = XLSX.utils.json_to_sheet(dataForExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Nómina");

      // Generar y descargar el archivo Excel
      XLSX.writeFile(workbook, "Consolidado_Nómina.xlsx");
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

  return (
    <div className="flex flex-col gap-3">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={downloadExcel}
      >
        Descargar Excel
      </button>
      {/* Tabla principal */}
      <Table
        color="secondary"
        selectionMode="single"
        defaultSelectedKeys={["0"]}
        aria-label="Tabla de empleados"
      >
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>APELLIDO</TableColumn>
          <TableColumn>CÉDULA</TableColumn>
          <TableColumn>BANCO</TableColumn>
          <TableColumn>NUM. CUENTA</TableColumn>
          <TableColumn>DÍAS TRABAJADOS</TableColumn>
          <TableColumn>DÍAS DOMINICALES</TableColumn>
          <TableColumn>VALOR DÍAS DOMINICALES</TableColumn>
          <TableColumn>CLASES DOMINICALES</TableColumn>
          <TableColumn>VALOR CLASES DOMINICALES</TableColumn>
          <TableColumn>HORAS INSTRUCTOR</TableColumn>
          <TableColumn>VALOR HORA INSTRUCTOR</TableColumn>
          <TableColumn>INSCRIPCIONES</TableColumn>
          <TableColumn>VALOR INSCRIPCIÓN</TableColumn>
          <TableColumn>SALDOS ADICIONALES</TableColumn>
          <TableColumn>DEDUCCIONES</TableColumn>
          <TableColumn>TOTAL A PAGAR</TableColumn>
          <TableColumn>OBSERVACIONES</TableColumn>
        </TableHeader>

        <TableBody>
          {data?.map((pd) => (
            <TableRow key={pd.pdid}>
              <TableCell>{pd.user_name}</TableCell>
              <TableCell>{pd.last_name}</TableCell>
              <TableCell>{formatCC(pd.cc)}</TableCell>
              <TableCell>{pd.bank_name}</TableCell>
              <TableCell>{pd.account_number}</TableCell>
              <TableCell>{pd.days_worked}</TableCell>
              <TableCell>{pd.days_sunday}</TableCell>
              <TableCell>{pd.value_days_sunday}</TableCell>
              <TableCell>{pd.sunday_classes}</TableCell>
              <TableCell>{pd.value_sunday_classes}</TableCell>
              <TableCell>{pd.instructor_hours}</TableCell>
              <TableCell>{pd.value_instructor_hours}</TableCell>
              <TableCell>{pd.registrations}</TableCell>
              <TableCell>{pd.value_registrations}</TableCell>
              <TableCell>{pd.additional_payments}</TableCell>
              <TableCell>{pd.deductions}</TableCell>
              <TableCell>{pd.total_payable}</TableCell>
              <TableCell>{pd.observations}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Tabla consolidada */}
      <div className="mt-5">
        <h2 className="text-xl font-bold">Consolidado de Nómina</h2>
        <Table color="primary" aria-label="Tabla consolidada de nómina">
          <TableHeader>
            <TableColumn>DÍAS TRABAJADOS</TableColumn>
            <TableColumn>DÍAS DOMINICALES</TableColumn>
            <TableColumn>VALOR DÍAS DOMINICALES</TableColumn>
            <TableColumn>CLASES DOMINICALES</TableColumn>
            <TableColumn>VALOR CLASES DOMINICALES</TableColumn>
            <TableColumn>HORAS INSTRUCTOR</TableColumn>
            <TableColumn>VALOR HORA INSTRUCTOR</TableColumn>
            <TableColumn>INSCRIPCIONES</TableColumn>
            <TableColumn>VALOR INSCRIPCIÓN</TableColumn>
            <TableColumn>SALDOS ADICIONALES</TableColumn>
            <TableColumn>DEDUCCIONES</TableColumn>
            <TableColumn>TOTAL A PAGAR</TableColumn>
          </TableHeader>

          <TableBody>
            <TableRow key="consolidado">
              <TableCell>{totals.days_worked}</TableCell>
              <TableCell>{totals.days_sunday}</TableCell>
              <TableCell>{totals.value_days_sunday}</TableCell>
              <TableCell>{totals.sunday_classes}</TableCell>
              <TableCell>{totals.value_sunday_classes}</TableCell>
              <TableCell>{totals.instructor_hours}</TableCell>
              <TableCell>{totals.value_instructor_hours}</TableCell>
              <TableCell>{totals.registrations}</TableCell>
              <TableCell>{totals.value_registrations}</TableCell>
              <TableCell>{totals.additional_payments}</TableCell>
              <TableCell>{totals.deductions}</TableCell>
              <TableCell>{totals.total_payable}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
