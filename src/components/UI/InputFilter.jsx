import { ListFilter } from "lucide-react";
import PropTypes from "prop-types";

export const InputFilter = ({ placeholder, rounded, colorIcons }) => {
  return (
    <div className="relative ">
      <ListFilter
        size={"18px"}
        className={`absolute left-2 top-3 text-[5px] ${colorIcons}`}
      />
      <input
        disabled
        placeholder={placeholder}
        type="text"
        className={`py-2 pl-8 pr-4 outline-none ${rounded}  w-full bg-white rounded-lg`}
      />
      <span className="absolute text-sm right-2 top-[7px] bg-purple-600 text-white py-1 px-[10px] rounded-full">
        3
      </span>
    </div>
  );
};

InputFilter.propTypes = {
  placeholder: PropTypes.string.isRequired,
  rounded: PropTypes.string,
  colorIcons: PropTypes.string,
};
