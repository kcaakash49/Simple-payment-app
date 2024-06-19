import PropTypes from 'prop-types';

const InputBox = ({label,placeholder,onChange}) => {
  return (
    <div className='pb-3'>
      <div className='text-sm font-semibold pb-1'>{label}</div>
      <input placeholder={placeholder} onChange={onChange} className='border rounded px-2 text-sm w-full'/>
    </div>
  )
}

InputBox.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

export default InputBox
