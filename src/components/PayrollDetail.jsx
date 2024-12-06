import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFetchToken } from "../hooks/useFetchToken.jsx";
import { fetchData } from "../hooks/fetchData.jsx";
import { EditIcon } from "./UI/Icons/EditIcon";
import { DeleteIcon } from "./UI/Icons/DeleteIcon.jsx";
import { Link, useLocation } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";

const URL_PD = `https://sigen-backend-zebi.onrender.com/api/enova/payrolls/details/`;

export const PayrollDetail = () => {
  const token = useFetchToken();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const pid = location.pathname.split("/")[3];
  const formatCC = (value) => new Intl.NumberFormat("es-CO").format(value || 0);

  
  useEffect(() => {
    if (!token) return;
    const loadPayrollDetail = async () => {
      try {
        const result = await fetchData(`${URL_PD}${pid}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(result.msg);
        setData(result.msg);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPayrollDetail();
  }, [token, pid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

 

  return (
    <div className="flex flex-col gap-3">
      {/* Tabla de usuarios */}
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
          <TableColumn>SALARIO BASE</TableColumn>
          <TableColumn>VAL. TOTAL DÍAS DOMINICALES</TableColumn>
          <TableColumn>VAL. TOTAL CLASES DOMINICALES</TableColumn>
          <TableColumn>VAL. TOTAL HORAS INSTRUCTOR</TableColumn>
          <TableColumn>VAL. TOTAL COMISIONES</TableColumn>
          <TableColumn>SALDOS ADICIONALES</TableColumn>
          <TableColumn>DEDUCCIONES</TableColumn>
          <TableColumn>TOTAL A PAGAR</TableColumn>
          <TableColumn>OBSERVACIONES</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
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
              <TableCell>{pd.total_salary}</TableCell>
              <TableCell>{pd.total_sunday_days}</TableCell>
              <TableCell>{pd.total_sunday_clasess}</TableCell>
              <TableCell>{pd.total_class_instructor}</TableCell>
              <TableCell>{pd.total_commission_registrations}</TableCell>
              <TableCell>{pd.additional_payments}</TableCell>
              <TableCell>{pd.deductions}</TableCell>
              <TableCell>{pd.total_payable}</TableCell>
              <TableCell>{pd.observations}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Link to={`/payrolls/details/update/${pd.pdid}`}>
                    <Tooltip content="Editar nómina">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Tooltip>
                  </Link>
                  <Tooltip color="danger" content="Eliminar nómina">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

PayrollDetail.propTypes = {
  enpoint: PropTypes.string.isRequired,
};
