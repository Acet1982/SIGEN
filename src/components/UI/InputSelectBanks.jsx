import PropTypes from "prop-types";

// const URL_USERS = "http://localhost:5000/api/enova/users/";

export const InputSelectBanks = ({ Icon, colorIcons, value, onChange }) => {
  const banks = [
    { bid: 0, bank: "SELECCIONE UN BANCO" },
    { bid: 1, bank: "Bancolombia" },
    { bid: 2, bank: "Nequi" },
    { bid: 3, bank: "Davivienda" },
    { bid: 4, bank: "Banco de bogota" },
  ];
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
        {banks.map((bank) => (
          <option key={bank.bid} value={bank.bid}>
            {bank.bank}
          </option>
        ))}
      </select>
    </div>
  );
};

InputSelectBanks.propTypes = {
  Icon: PropTypes.object.isRequired,
  colorIcons: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
};
