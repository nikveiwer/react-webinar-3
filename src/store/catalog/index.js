import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
    constructor(store, name) {
        super(store, name);
        this.generateCode = codeGenerator(0);
    }

    initState() {
        return {
            list: [],
            totalPages: 1,
            currentPage: 100
        };
    }

    async load(currentPage) {

        const limit = 10;

        const response = await fetch(
            `/api/v1/articles?limit=${limit}&skip=${(currentPage - 1)*limit}&fields=items(_id, title, price),count`,
        ); //'/api/v1/articles'
        const json = await response.json();
        console.log(json)
        this.setState(
            {
                ...this.getState(),
                list: json.result.items,
                totalPages: Math.ceil(json.result.count / limit),
            },
            'Загружены товары из АПИ',
        );
    }

    setCurrentPage(page) {
        this.setState(
            {
                ...this.getState(),
                currentPage: page
            },
            'Изменена страница',
        );
    }
}

export default Catalog;
