import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const [isModal, setIsModal] = useState(true)

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    toggleModal: () => {
      setIsModal(isModal => !isModal)
    }
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls toggleModal={callbacks.toggleModal}/>
      <List list={list}
            onDeleteItem={callbacks.onDeleteItem}
            onSelectItem={callbacks.onSelectItem}/>
      {isModal && <Modal text="Корзина" toggleModal={callbacks.toggleModal}></Modal>}
    </PageLayout>
  );
}

export default App;
