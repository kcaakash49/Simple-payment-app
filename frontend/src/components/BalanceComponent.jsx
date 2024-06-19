
import PropTypes from 'prop-types';

function BalanceComponent({ balance }) {
  return (
    <div className="py-2">
      <div className="text-sm font-semibold">Your Balance Rs. {balance}</div>
    </div>
  );
}

BalanceComponent.propTypes = {
  balance: PropTypes.number.isRequired,
};

export default BalanceComponent;
