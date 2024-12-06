import { TitlePages } from "../components/UI/TittlePages";
import { FilterPayroll } from "../components/FilterPayroll";
import { FilterApplied } from "../components/FilterApplied";
import { DescriptionPage } from "../components/UI/DescriptionPage";
import { CardPayroll } from "../components/CardPayroll";
import { useFetchToken } from "../hooks/useFetchToken";
import { jwtDecode } from "jwt-decode";

export const AllPayrolls = () => {
  const token = useFetchToken();
  const decodedToken = token ? jwtDecode(token) : null;
  const role_id = decodedToken?.role_id;

  // Renderiza un loader mientras el token o el role_id no están disponibles
  if (!token || !role_id) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* Componente título de página */}
      <TitlePages title={"All Payrolls"} />

      {/* Componente filtro de nóminas */}
      <FilterPayroll />

      {/* Componente Lista de filtros aplicados*/}
      <FilterApplied />

      {/* Componente resultados */}
      <DescriptionPage description={"Nóminas publicadas!"} by={"Mes"} />

      {/* Componente tarjetas de nóminas */}
      <CardPayroll endpoint={role_id === 5 ? "/internal-control" : "/"} />
    </>
  );
};
