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
            this.events.emit('basket:open');
        })
    }

    
    set counter(count: string) {
        this._counter.textContent = count;
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }
    
    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }
}