import { Select, SelectItem } from "@nextui-org/react";
import PropTypes from "prop-types";

export const SelectInputClass = ({ value, onChange }) => {
  const sitesMoments = [
    { sid: 1, sitename: "Apartado" },
    { sid: 2, sitename: "Caucasia" },
    { sid: 3, sitename: "Montería" },
    { sid: 4, sitename: "Oficina Central" },
    { sid: 5, sitename: "Team 1" },
    { sid: 6, sitename: "Team 2" },
    { sid: 7, sitename: "Team 3" },
  ];

  return (
    <>
      <Select
        variant="bordered"
        label="Seleccione una sede"
        placeholder="Elija una opción"
        value={value}
        onChange={onChange}
      >
        {sitesMoments.map((site) => (
          <SelectItem key={site.sid} value={site.sid}>
            {site.sitename}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

SelectInputClass.propTypes = {
  value: PropTypes.func,
  onChange: PropTypes.func,
};
