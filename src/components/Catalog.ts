import { ICatalog, IProduct } from "../types"
import { CDN_URL, eventNames } from "../utils/constants";
import { IEvents } from "./base/events";

export class Catalog implements ICatalog {

    protected _products: IProduct[];
    protected _curProduct: string | null;
    protected events: IEvents;

    constructor(events:IEvents){
        this.events = events;
    }

    get products() {
        return this._products;
    }

    set products(products: IProduct[]) {
        this._products = products;
        this.events.emit(eventNames.productsAdd);
    }

    set curProduct(curProduct: string) {
        this._curProduct = curProduct;
        this.events.emit(eventNames.productSelected);
    }

    getProductFromCatalog(): IProduct {
        return this._products.find(product => product.id === this._curProduct);
    }
}