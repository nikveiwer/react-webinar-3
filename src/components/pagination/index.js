import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({ sum }) {
    
    return (
        <div className={"Pagination"}>
            <button className='Pagination-page'>
                <div>7</div>
            </button>
            <button className='Pagination-page'>
                <div>7</div>
            </button>
            <button className='Pagination-page active'>
                <div>7</div>
            </button>
        </div>
    );
}

Pagination.propTypes = {
    sum: PropTypes.number,
};

Pagination.defaultProps = {
    sum: 0,
};

export default memo(Pagination);
