import PropTypes from "prop-types";


// const URL_USERS = "http://localhost:5000/api/enova/users/";

export const InputSelect = ({ Icon, colorIcons, optionOne }) => {
  return (
    <div className="relative ">
      {Icon && (
        <Icon
          size={"18px"}
          className={`absolute left-2 top-[9px] text-[10px] ${colorIcons}`}
        />
      )}
      <select
        type="text"
        className={`py-2 pl-8 pr-4 outline-none  w-full bg-white rounded-lg`}
      >
        <option>{optionOne}</option>
        <option>Opción 2</option>
        <option>Opción 3</option>
        <option>Opción 4</option>
        <option>Opción 5</option>
      </select>
    </div>
  );
};

InputSelect.propTypes = {
  Icon: PropTypes.object.isRequired,
  colorIcons: PropTypes.string,
  optionOne: PropTypes.string.isRequired,
};
