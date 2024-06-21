import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface ISucces {
    price: number;
}

export class Succes extends Component<ISucces> {
    protected events: IEvents;
    protected priceElement : HTMLElement;
    protected button: HTMLButtonElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        this.priceElement = ensureElement('.order-success__description', this.container)
        this.button = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.button.addEventListener('click', () => {
            events.emit('succes:close');
        })
    }

    set price(price: string) {
        this.priceElement.textContent = `Списано ${price} синапсов`;
    }
}