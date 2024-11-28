import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";

export const DescriptionPage = ({ description, by }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p>{description}</p>
        <p className="flex items-center gap-2">
          Ordenados por: <span className="text-purple-600 font-bold">{by}</span>
          <ChevronDown />
        </p>
      </div>
    </>
  );
};

DescriptionPage.propTypes = {
  description: PropTypes.string.isRequired,
  by: PropTypes.string.isRequired,
};
