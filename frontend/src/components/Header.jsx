import PropTypes from 'prop-types';

const Header = ({text})=>{

    return <div className='text-center text-2xl font-bold pt-4'>
        {text}
    </div>
}
Header.propTypes = {
    text : PropTypes.string.isRequired
}
export default Header;