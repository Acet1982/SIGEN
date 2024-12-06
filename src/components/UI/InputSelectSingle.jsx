import { Select, SelectItem } from "@nextui-org/react";
import PropTypes from "prop-types";

export const InputSelectSingle = ({ value, onChange }) => {
  const days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 ">
      <Select
        value={value}
        onChange={onChange}
        label="Seleccione los dias trabajados"
      >
        {days.map((day) => (
          <SelectItem  key={day} value={day}>
            {day}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

InputSelectSingle.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};
