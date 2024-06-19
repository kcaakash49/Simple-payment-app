import PropTypes from "prop-types";

function Button({ onClick, label }) {
    return <div className="pb-2">
        <button onClick={onClick} className="w-full bg-black text-white rounded-md text-sm p-2">{label}</button>
    </div>;
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default Button
