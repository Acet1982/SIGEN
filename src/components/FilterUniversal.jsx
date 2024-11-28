import PropTypes from "prop-types";
import { CalendarSearch } from "lucide-react";
import { InputSelect } from "./UI/InputSelect";
import { ButtonSingle } from "./UI/ButtonSingle";
import { InputSearch } from "../components/UI/InputSearch";

export const FilterUniversal = ({ colorIcons, placeholder, label }) => {
  return (
    <>
      {/* Filtro de nóminas por sedes, mes y periodo*/}
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-6">
        <div className="col-span-2">
          <InputSearch colorIcons={colorIcons} placeholder={placeholder} />
        </div>

        <div className="col-span-1">
          <InputSelect
            optionOne={"Mes"}
            Icon={CalendarSearch}
            colorIcons={"text-purple-600"}
          />
        </div>
        <div className="col-span-1">
          <ButtonSingle type={"submit"} label={label} />
        </div>
      </form>
    </>
  );
};

FilterUniversal.propTypes = {
  colorIcons: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
