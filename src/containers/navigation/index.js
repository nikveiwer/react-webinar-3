import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Menu from "../../components/menu";
import BasketTool from "../../components/basket-tool";
import SideLayout from "../../components/side-layout";
import { useDispatch } from 'react-redux';
import modalsActions from '../../store-redux/modals/actions';

function Navigation() {
  const store = useStore();
  const dispatch = useDispatch();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => {
      //store.actions.modals.open('basket')
      dispatch(modalsActions.open('basket'));
    }, [store]),

    // Обработка перехода на главную
    onNavigate: useCallback((item) => {
      if (item.key === 1) store.actions.catalog.resetParams();
    }, [store])
  }

  // Функция для локализации текстов
  const multilang = useTranslate();

  console.log(multilang.lang)

  const { t } = multilang

  const options = {
    menu: useMemo(() => ([
      { key: 1, title: t('menu.main'), link: '/' },
    ]), [multilang])
  };

  return (
    <SideLayout side='between'>
      <Menu items={options.menu} onNavigate={callbacks.onNavigate} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} multilang={multilang} />
    </SideLayout>
  );
}

export default memo(Navigation);
