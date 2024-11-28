import { Search } from "lucide-react";
import PropTypes from "prop-types";

export const InputSearch = ({ placeholder, rounded, colorIcons }) => {
  return (
    <div className="relative ">
      <Search
        size={"18px"}
        className={`absolute left-2 top-3 text-[5px] ${colorIcons}`}
      />
      <input
        placeholder={placeholder}
        type="text"
        className={`py-2 pl-8 pr-4 outline-none ${rounded}  w-full bg-white rounded-lg `}
      />
    </div>
  );
};

InputSearch.propTypes = {
  placeholder: PropTypes.string.isRequired,
  rounded: PropTypes.string,
  colorIcons: PropTypes.string,
};
