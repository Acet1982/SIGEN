import { FilterUniversal } from "../components/FilterUniversal";
import { TableEmployees } from "../components/TableEmployees";
import { DescriptionPage } from "../components/UI/DescriptionPage";
import { TitlePages } from "../components/UI/TittlePages";

export const AllEmployees = () => {
  return (
    <>
      {/* Componente título de página */}
      <TitlePages title={"All Administrators"} />

      {/* Componente filtro de empleados */}
      <FilterUniversal
        placeholder="Buscar empleado por nombre o apellido"
        label={"Agregar empleado"}
        colorIcons={"text-purple-600"}
      />

      {/* Componente descripción de empleados */}
      <DescriptionPage description="Lista de empleados" by="Nombre" />

      {/* Componente tabla de empleados */}
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4">
          <TableEmployees enpoint="employees" />
        </div>
      </div>
    </>
  );
};
