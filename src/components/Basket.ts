import { IBasket, IProduct } from "../types";
import { IEvents } from "./base/events";

export class Basket implements IBasket {
    protected _products: IProduct[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
        this._products = [];
    }

    addProductToBaseket(product: IProduct): void {
        const isProductInBasket = this._products.find((item) => item.id === product.id);
        if (!isProductInBasket) {
            this._products = [product, ...this._products];
            this.events.emit('basket:changed');
        }
    }

    deleteProductFromBaseket(id?: string ): void {
        if (id) {
            this._products = this._products.filter((el) => el.id !== id);
        }
        else 
            this._products = [];
        
        this.events.emit('basket:changed');
    }

    getProductsFromBasket(): IProduct[] {
        return this._products;
    }

    isBasketHaveProducts(): boolean {
        return this._products.length > 0 ? false : true;
    }

    getProductsIdsFromBasket(): string[] {
        return this._products.map((product) => product.id)
    }

    getTotalFromBasket(): number {
        return this._products.reduce((sum, item) => {
            return sum + item.price;
        }, 0);
    }

    getCountProductsFromBasket(): string {
        return String(this._products.length);
    }
    
    clearBasket() {
        this._products = [];
    }
    
}