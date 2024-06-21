import { ICatalog, IProduct } from "../types"
import { CDN_URL } from "../utils/constants";
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
        this.events.emit('products:add');
    }

    set curProduct(curProduct: string) {
        this._curProduct = curProduct;
        this.events.emit('product:selected');
    }

    getProductFromCatalog(): IProduct {
        return this._products.find(product => product.id === this._curProduct);
    }
}