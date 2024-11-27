import PropTypes from "prop-types";

export const TitlePages = ({ title }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );
};

TitlePages.propTypes = {
  title: PropTypes.string.isRequired,
};
