import { TitlePages } from "../components/UI/TittlePages";
import { FilterPayroll } from "../components/FilterPayroll";
import { FilterApplied } from "../components/FilterApplied";
import { DescriptionPage } from "../components/UI/DescriptionPage";
import { CardPayroll } from "../components/CardPayroll";

export const AllPayrolls = () => {

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

      <CardPayroll />

      {/* {data && data.role_id === 2 && (
        <CardPayroll token={token} />
      )} */}
    </>
  );
};
