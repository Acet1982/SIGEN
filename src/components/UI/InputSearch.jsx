import { Search } from "lucide-react";
import PropTypes from "prop-types";

export const InputSearch = ({ placeholder, rounded, colorIcons }) => {
  return (
    <div className="relative ">
      <Search className={`absolute left-2 top-2 text-[5px] ${colorIcons}`} />
      <input
        placeholder={placeholder}
        type="text"
        className={`py-2 pl-8 pr-4 outline-none ${rounded}  w-full bg-slate-50 `}
      />
    </div>
  );
};

InputSearch.propTypes = {
  placeholder: PropTypes.string.isRequired,
  rounded: PropTypes.string,
  colorIcons: PropTypes.string,
};
