import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addToBasket(listItem) {

    const isAlreadyExist = this.state.basket.find(item => item.code === listItem.code)
    let newBasket;

    if (!isAlreadyExist) {
      newBasket = [...this.state.basket, { ...listItem, count: 1 }]
    } else {

      isAlreadyExist.count++

      newBasket = this.state.basket.map(item => {
        if (item.code === listItem.code) {
          return isAlreadyExist
        }

        return item
      })
    }

    this.setState({
      ...this.state,
      basket: newBasket
    })
  };

  

  /**
   * Удаление из корзины
   * @param code
   */
  deleteFromBasket(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code)
    })
  };

  getFullCount() {
    return this.state.basket.length
  }

  getFullPrice() {
    return this.state.basket.reduce((acc, curr) => acc+ curr.price*curr.count, 0)
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }
}

export default Store;
