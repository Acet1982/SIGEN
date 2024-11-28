import { Calendar1, CalendarSearch, MapPinHouse } from "lucide-react";
import { InputSelect } from "./UI/InputSelect";
import { InputFilter } from "./UI/InputFilter";
import { ButtonSingle } from "./UI/ButtonSingle";

export const FilterPayroll = () => {
  return (
    <>
      {/* Filtro de nóminas por sedes, mes y periodo*/}
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-6">
        <div className="col-span-1">
          <InputSelect
            optionOne={"Sedes"}
            Icon={MapPinHouse}
            colorIcons={"text-purple-600"}
          />
        </div>

        <div className="col-span-1">
          <InputSelect
            optionOne={"Mes"}
            Icon={CalendarSearch}
            colorIcons={"text-purple-600"}
          />
        </div>

        <div className="col-span-1">
          <InputSelect
            optionOne={"Corte"}
            Icon={Calendar1}
            colorIcons={"text-purple-600"}
          />
        </div>

        <div className="flex items-center col-span-1 gap-4 justify-between">
          <div className="w-full">
            <InputFilter placeholder="Filtros" colorIcons={"text-purple-600"} />
          </div>
          <div className="">
            <ButtonSingle
              type={"submit"}
              label="Buscar"
              placeholder="Buscar"
            />
          </div>
        </div>
      </form>
    </>
  );
};
