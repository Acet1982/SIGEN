import { CircleDollarSign } from "lucide-react";
import PropTypes from "prop-types";

export const Input = ({ placeholder, colorIcons, value, onChange }) => {
  return (
    <div className="relative">
      <CircleDollarSign
        size={"18px"}
        className={`absolute left-2 top-3 text-[5px] ${colorIcons}`}
      />
      <input
        className="py-2 pl-8 pr-4 outline-none w-full bg-white rounded-lg"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  colorIcons: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
};
