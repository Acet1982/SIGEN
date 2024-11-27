import { TitlePages } from "../components/UI/TittlePages";
import { FilterPayroll } from "../components/FilterPayroll";
import { FilterApplied } from "../components/FilterApplied";
import { DescriptionPage } from "../components/DescriptionPage";
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
      <DescriptionPage />

      {/* Componente tarjetas de nóminas */}
      <CardPayroll />
      <CardPayroll />
      <CardPayroll />
    </>
  );
};
