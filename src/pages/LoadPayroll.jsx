import { jwtDecode } from "jwt-decode";
import { TableEmployees } from "../components/TableEmployees";
import { DescriptionPage } from "../components/UI/DescriptionPage";
import { useFetchToken } from "../hooks/useFetchToken";
import { OnePayrollDetail } from "../sections/OnePayrollDetail";
import { Layout } from "./Layout";
import { TitlePages } from "../components/UI/TittlePages";
import { AprobatedPayroll } from "../components/UI/AprobatedPayroll";

export const LoadPayroll = () => {
  const token = useFetchToken();
  const decodedToken = token ? jwtDecode(token) : null;
  const role_id = decodedToken?.role_id;

  if (!token || !role_id) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      {/* Componente título de página */}
      <TitlePages title={"Detalles de nómina"} />

      <AprobatedPayroll
        endpoind={
          role_id === 5
            ? "validated"
            : role_id === 1
            ? "/correctpayroll"
            : "corrected"
        }
        label={
          role_id === 1
            ? "Corregir nómina"
            : role_id === 5
            ? "Validar nómina"
            : "Nómina corregida"
        }
      />

      {role_id === 2 && (
        <>
          <TableEmployees enpoint="employees" />
        </>
      )}

      <DescriptionPage
        description="Nóminas de empleados!"
        by="Fecha de carga"
      />
      <OnePayrollDetail />
    </Layout>
  );
};
