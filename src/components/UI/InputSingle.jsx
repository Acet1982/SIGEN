import { Input } from "@nextui-org/react";
import PropTypes from "prop-types";

export const InputSingle = ({ value, type, label, placeholder, onChange }) => {
  return (
    <Input
      type={type}
      variant="bordered"
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

InputSingle.propTypes = {
  value: PropTypes.number,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
