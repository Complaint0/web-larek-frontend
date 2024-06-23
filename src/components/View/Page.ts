import { eventNames } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IPage {
    counter: string;
    catalog: HTMLElement[];
    locked: boolean;
}

export class Page extends Component<IPage> {
    protected _catalog: HTMLElement;
    protected _miniBasket: HTMLButtonElement;
    protected _counter: HTMLElement;
    protected _wrapper: HTMLElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);

        this.events = events;

        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this._catalog = ensureElement('.gallery', this.container);
        this._miniBasket = ensureElement<HTMLButtonElement>('.header__basket', this.container);
        this._counter = ensureElement('.header__basket-counter', this._miniBasket);

        this._miniBasket.addEventListener('click', () => {
            this.events.emit(eventNames.basketOpen);
        })
    }

    
    set counter(count: string) {
        this.setText(this._counter, count)
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }
    
    set locked(value: boolean) {
        if (value) {
            this.toggleClass(this._wrapper, 'page__wrapper_locked', true)
        } else {
            this.toggleClass(this._wrapper, 'page__wrapper_locked', false)
        }
    }
}