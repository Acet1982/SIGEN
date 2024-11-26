import PropTypes from "prop-types";

export const ButtonBurger = ({ children, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="lg:hidden fixed bottom-4 right-4 bg-purple-600 p-2 text-white rounded-full text-2xl z-40"
      >
        {children}
      </button>
    </>
  );
};

ButtonBurger.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func.isRequired,
};
