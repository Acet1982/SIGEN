import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./Icons/EyeSlashFilledIcon";
import PropTypes from "prop-types";

export const InputPassword = ({ label, placeholder, onChange }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      label={label}
      variant="bordered"
      placeholder={placeholder}
      onChange={onChange}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
          aria-label="toggle password visibility"
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
};

InputPassword.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
