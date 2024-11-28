import { FilterUniversal } from "../components/FilterUniversal";
import { TableUsers } from "../components/TableUsers";
import { DescriptionPage } from "../components/UI/DescriptionPage";
import { TitlePages } from "../components/UI/TittlePages";

export const AllCoordinators = () => {
  return (
    <>
      {/* Componente título de página */}
      <TitlePages title={"All Coordinators"} />

      {/* Componente filtro de administradores */}
      <FilterUniversal
        placeholder="Buscar administrador por nombre o apellido"
        label={"Agregar coordinador"}
        colorIcons={"text-purple-600"}
      />

      {/* Componente descripción de administradores */}
      <DescriptionPage description="Lista de coordinadores" by="Nombre" />

      {/* Componente tabla de administradores */}
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4">
          <TableUsers enpoint="coordinators" />
        </div>
      </div>
    </>
  );
};
