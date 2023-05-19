import React from "react";
import PropTypes from 'prop-types';
import './style.css';

import { plural } from "../../utils";

function Controls({toggleModal}){
  return (
    <div className='Controls'>
      <p className="Controls-text">В корзине:</p>
      <div className="Controls-data">
        {"2"} {plural(2, {one: 'товар', few: 'товара', many: 'товаров'})} / {(223).toLocaleString("ru-RU")} ₽
      </div>
      <button onClick={toggleModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  toggleModal: PropTypes.func
};

Controls.defaultProps = {
  toggleModal: () => {}
}

export default React.memo(Controls);
