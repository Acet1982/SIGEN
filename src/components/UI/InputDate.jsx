import { DateInput } from "@nextui-org/react";
import { CalendarDate, parseDate } from "@internationalized/date";
import PropTypes from "prop-types";

export const InputDate = ({ type, label }) => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DateInput
        type={type}
        label={label}
        isRequired
        defaultValue={parseDate("2024-04-04")}
        placeholderValue={new CalendarDate(1995, 11, 6)}
      />
    </div>
  );
};

InputDate.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
