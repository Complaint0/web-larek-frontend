import { eventNames } from "../../utils/constants";
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
    protected basketItemIndex: HTMLSpanElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.basketList = ensureElement('.basket__list', this.container);
        this.basketPrice = ensureElement('.basket__price', this.container);
        this.basketBuyButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.basketBuyButton.addEventListener('click', () => {
            this.events.emit(eventNames.basketBuy);
        })
    }

    set price(price: number) {
        this.setText(this.basketPrice, price + ' синапсов')
    }

    set catalog(items: HTMLElement[]) {
        this.basketList.replaceChildren(...items);
    }

    set basketBuyButtonState(state: boolean) {
        this.setDisabled(this.basketBuyButton, state)
    }
}