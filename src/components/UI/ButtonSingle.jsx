import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";

export const ButtonSingle = ({ label, type, onClick }) => {
  return (
    <Button type={type} onClick={onClick} color="secondary" variant="shadow">
      {label}
    </Button>
  );
};

ButtonSingle.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
