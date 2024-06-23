import './scss/styles.scss';
import { Catalog } from './components/Catalog';
import { UserData } from './components/UserData';
import { Basket } from './components/Basket';
import { EventEmitter } from './components/base/events';
import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { API_URL, CDN_URL, eventNames, settings } from './utils/constants';
import { Product } from './components/View/Product';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/View/Modal';
import { BasketView } from './components/View/BasketView';
import { Page } from './components/View/Page';
import { FormOrder } from './components/View/FormOrder';
import { Succes } from './components/View/Success';
import { IUserContacts, IUserOrder, IUserValid } from './types';
import { FormContacts } from './components/View/FormContacts';


const events = new EventEmitter();

//DATA
const catalog = new Catalog(events);
const userData = new UserData(events);
const basket = new Basket(events);

//TEMPLATES
const productTemplate : HTMLTemplateElement = document.querySelector('#card-catalog');
const productPreviewTemplate : HTMLTemplateElement = document.querySelector('#card-preview')
const productBasketTemplate : HTMLTemplateElement = document.querySelector('#card-basket')
const basketTemplate : HTMLTemplateElement = document.querySelector('#basket');
const formOrderTemplate: HTMLTemplateElement = document.querySelector('#order');
const formContactsTemplate: HTMLTemplateElement = document.querySelector('#contacts');
const succesTemplate: HTMLTemplateElement = document.querySelector('#success');


// API
const baseApi = new Api(API_URL, settings);
const api = new AppApi(baseApi, CDN_URL);


// VIEW
const page = new Page(document.body, events);

const productPreview = new Product(cloneTemplate(productPreviewTemplate), events);

const basketView = new BasketView(cloneTemplate(basketTemplate), events);

const modal = new Modal(ensureElement('.modal'), events);

const formOrder = new FormOrder(cloneTemplate(formOrderTemplate), events);
const formContacts = new FormContacts(cloneTemplate(formContactsTemplate), events);

const succes = new Succes(cloneTemplate(succesTemplate), events);





api.getProducts()
    .then(data => {
        catalog.products = data
})
    .catch((err) => console.log(err));



events.on(eventNames.productsAdd, () => {
    const productsArray = catalog.products.map((product) => {
        const productItem = new Product(cloneTemplate(productTemplate), events)
            return productItem.render(product);
    })
    page.catalog = productsArray;
})

events.on(eventNames.productSelect, (data: {id : string}) => {
    const { id } = data;
    catalog.curProduct = id;
})

events.on(eventNames.productSelected, () => {
    const curProduct = catalog.getProductFromCatalog();
    const productItem = productPreview.render(curProduct);
        modal.render({item: productItem});
})


events.on(eventNames.basketAdd, () => {
    modal.closeModal();
    basket.addProductToBaseket(catalog.getProductFromCatalog());
})


events.on(eventNames.basketChanged, () => {
    page.counter = basket.getCountProductsFromBasket();
})

events.on(eventNames.basketDelete, (data: {id: string}) => {
    const { id } = data;
    basket.deleteProductFromBaseket(id);

    renderBasketItems();
})

events.on(eventNames.basketOpen, () => {
    renderBasketItems();
})

events.on(eventNames.basketBuy, () => {
    userData.setUserProducts(basket.getProductsIdsFromBasket());
    userData.setTotal(basket.getTotalFromBasket());
})

events.on(eventNames.userAddProducts, () => {
    modal.render({item: formOrder.render()});
})


events.on(eventNames.orderInput, (data: {field: keyof IUserValid, value: string}) => {
    const {field, value} = data;
    formOrder.error = userData.checkField({field, value});
    formOrder.valid = userData.checkOrderValidation();
    console.log(userData.getUserData())
})

events.on(eventNames.orderFill, () => {
    modal.render({item: formContacts.render()});
});


events.on(eventNames.contactsInput, (data: {field: keyof IUserValid, value: string}) => {
    const {field, value} = data;
    formContacts.error = userData.checkField({field , value});
    console.log(userData.getUserData())
    formContacts.valid = userData.checkContactsValidation();
})


events.on(eventNames.contactsFill, () => {
    basket.deleteProductFromBaseket();
    api.sendOrder(userData.getUserData())
    .then(res => {
        const total = res.total;
        modal.render({item: succes.render({price: total})})
        basket.clearBasket();
    })
    .catch((err) => console.log(err));
});



events.on(eventNames.succesClose, () => {
    modal.closeModal();
});

events.on(eventNames.modalOpen, () => {
    page.locked = true;
});

events.on(eventNames.modalClose, () => {
    page.locked = false;
});



function renderBasketItems() {
    const basketArray = basket.getProductsFromBasket().map((product, index) => {
        const basketItem = new Product(cloneTemplate(productBasketTemplate), events)
            return basketItem.render({...product, index: index + 1});
    });

    const baksetProducts = basketView.render({
        price: basket.getTotalFromBasket(), 
        catalog: basketArray, 
        basketBuyButtonState: basket.isBasketHaveProducts()})
    modal.render({item: baksetProducts});
}

// events.onAll((event) => {
//     console.log(event.eventName, event.data)
// })
