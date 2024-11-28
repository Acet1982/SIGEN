import { FilterUniversal } from "../components/FilterUniversal";
import { TitlePages } from "../components/UI/TittlePages";
import { TableUsers } from "../components/TableUsers";
import { DescriptionPage } from "../components/UI/DescriptionPage";
import { ModalUniversal } from "../components/ModalUniversal";

export const AllAdmins = () => {
  return (
    <>
      <ModalUniversal />

      {/* Componente título de página */}
      <TitlePages title={"All Administrators"} />

      {/* Componente filtro de administradores */}
      <FilterUniversal
        placeholder="Buscar administrador por nombre o apellido"
        label={"Agregar administrador"}
        colorIcons={"text-purple-600"}
      />

      {/* Componente descripción de administradores */}
      <DescriptionPage description="Lista de administradores" by="Nombre" />

      {/* Componente tabla de administradores */}
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4">
          <TableUsers enpoint="administrators" />
        </div>
      </div>
    </>
  );
};
