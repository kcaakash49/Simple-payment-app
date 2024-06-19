
import PropTypes from 'prop-types';

function AppBar({ user }) {
  return (
    <div className="flex justify-between py-2 border-y">
      <div className="font-semibold">SamplePaymentApp</div>
      <div>Hello, {user}</div>
    </div>
  );
}

AppBar.propTypes = {
  user: PropTypes.string.isRequired,
};

export default AppBar;
