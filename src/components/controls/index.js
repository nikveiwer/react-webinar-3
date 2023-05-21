import React from "react";
import PropTypes from 'prop-types';
import './style.css';

import { plural } from "../../utils";

function Controls(props){

  const callbacks = {
    onToggleModal: () => {
      props.toggleModal();
    }
  }

  const fullCount = props.getFullCount();
  const fullPrice = props.getFullPrice().toLocaleString("ru-RU")

  return (
    <div className='Controls'>
      <p className="Controls-text">В корзине:</p>
      <div className="Controls-data">
        {fullCount ? (
          `${fullCount} ${plural(fullCount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${fullPrice} ₽`
        ) : (
          "пусто"
        )}
      </div>
      <button onClick={callbacks.onToggleModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  toggleModal: PropTypes.func,
  getFullCount: PropTypes.func,
  getFullPrice: PropTypes.func
 
};

Controls.defaultProps = {
  toggleModal: () => {},
  getFullCount: () => {},
  getFullPrice: () => {}
}

export default React.memo(Controls);
