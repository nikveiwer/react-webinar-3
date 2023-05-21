import React from "react";
import PropTypes from 'prop-types';
import './style.css';

import { plural } from "../../utils";

function Total(props){

  const fullPrice = props.getFullPrice().toLocaleString("ru-RU")

  return (
    <div className='Total'>
        <div>Итого</div>
        <div>{fullPrice} ₽</div>
    </div>
  )
}

Total.propTypes = {
  getFullPrice: PropTypes.func
 
};

Total.defaultProps = {
  getFullPrice: () => {}
}

export default Total;