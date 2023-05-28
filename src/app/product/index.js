import {memo, useCallback, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import ProductInfo from '../../components/product-info';


function Product() {

  const { productId } = useParams();

  const store = useStore();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  useEffect(() => {
    callbacks.closeModal()
    store.actions.catalog.loadProduct(productId);
  }, []);

  const select = useSelector(state => ({
    sum: state.basket.sum,
    amount: state.basket.amount,
    currentProduct: state.catalog.currentProduct,
  }));


  const {title, ...productProps} = select.currentProduct

  return (
    <PageLayout>
      <Head title={title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ProductInfo {...productProps} productId={productId}  addToBasket={callbacks.addToBasket}/>
      {/* <button onClick={() => callbacks.addToBasket(productId)}>Добавить</button> */}
    </PageLayout>

  );
}

export default memo(Product);
