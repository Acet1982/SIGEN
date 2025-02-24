import PropTypes from "prop-types";

// const URL_USERS = "http://localhost:5000/api/enova/users/";

export const InputSelect = ({
  Icon,
  colorIcons,
  value,
  onChange,
}) => {
  const days = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
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
        value={value}
        onChange={onChange}
      >
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
};

InputSelect.propTypes = {
  Icon: PropTypes.object.isRequired,
  colorIcons: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
};
