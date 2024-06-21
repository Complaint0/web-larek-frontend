import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";


interface IProductContainer {
    catalog: HTMLElement[];
    price : number;
    basketBuyButtonState: boolean
}

export class BasketView extends Component<IProductContainer> {
    protected basketList : HTMLElement;
    protected basketPrice : HTMLElement;
    protected basketBuyButton : HTMLButtonElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.basketList = ensureElement('.basket__list', this.container);
        this.basketPrice = ensureElement('.basket__price', this.container);
        this.basketBuyButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.basketBuyButton.addEventListener('click', () => {
            this.events.emit('basket:buy');
        })
    }

    set price(price: number) {
        this.basketPrice.textContent = price + ' синапсов';
    }

    set catalog(items: HTMLElement[]) {
        this.basketList.replaceChildren(...items);
    }

    set basketBuyButtonState(value: boolean) {
        this.basketBuyButton.disabled = value;
    }

}