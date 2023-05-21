import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Total from './components/total';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const basketList = store.getState().basket

  const [isModal, setIsModal] = useState(false)

  const callbacks = {
    onDeleteFromBasket: useCallback((code) => {
      store.deleteFromBasket(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddToBasket: useCallback((listItem) => {
      store.addToBasket(listItem);
    }, [store]),

    onDeleteFromBasket: useCallback((code) => {
      store.deleteFromBasket(code);
    }, [store]),

    getFullCount: useCallback(() => {
      return store.getFullCount()
    }, [store]),

    getFullPrice: useCallback(() => {
      return store.getFullPrice()
    }, [store]),

    toggleModal: () => {
      setIsModal(isModal => !isModal)
    }
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls toggleModal={callbacks.toggleModal} 
                getFullCount={callbacks.getFullCount} 
                getFullPrice={callbacks.getFullPrice}/>
      <List list={list}
            onAddToBasket={callbacks.onAddToBasket}/>
      {isModal &&
        <Modal text="Корзина" toggleModal={callbacks.toggleModal}>
          <List list={basketList}
                onDeleteFromBasket={callbacks.onDeleteFromBasket}
                basket/>
          <Total getFullPrice={callbacks.getFullPrice}/>
        </Modal>}
    </PageLayout>
  );
}

export default App;
