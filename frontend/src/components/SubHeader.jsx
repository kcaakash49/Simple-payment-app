import PropTypes from 'prop-types';

const SubHeader = ({text})=>{

    return <div className='text-slate-500 text-md pt-1 px-4 pb-4 text-center'>
        {text}
    </div>
}
SubHeader.propTypes = {
    text : PropTypes.string.isRequired
}
export default SubHeader;