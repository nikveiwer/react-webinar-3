import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from "../../utils/number-format";
import './style.css';

function BasketTool({ sum, amount, onOpen, multilang }) {
  const cn = bem('BasketTool');
  const { t } = multilang;
  return (
    <div className={cn()}>
      <span className={cn('label')}>{t('basket.inBasket')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${t('basket.articles', amount)} / ${numberFormat(sum)} ₽`
          : t('basket.empty')
        }
      </span>
      <button onClick={onOpen}>{t('basket.open')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  t: PropTypes.func
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0,
  multilang: PropTypes.object
}

export default memo(BasketTool);
