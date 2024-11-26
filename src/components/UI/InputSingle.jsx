import { Input } from "@nextui-org/react";
import PropTypes from "prop-types";

export const InputSingle = ({ type, label, placeholder, onChange }) => {
  return (
    <Input
      type={type}
      variant="bordered"
      label={label}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

InputSingle.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
