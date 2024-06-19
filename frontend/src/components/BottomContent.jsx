import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';


const BottomContent = ({label,text,to}) => {
    const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="text-xs pr-1">{label}</div>
      <div onClick={()=> navigate(to)} className=" text-xs cursor-pointer underline hover:text-blue-400">{text}</div>
    </div>
  )
}

BottomContent.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default BottomContent
