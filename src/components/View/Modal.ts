import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";


interface IModal {
    item: HTMLElement | HTMLFormElement;
}

export class Modal extends Component<IModal> {
    protected closeButton: HTMLButtonElement;
    protected dataContainer: HTMLElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.dataContainer = ensureElement('.modal__content', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.closeButton.addEventListener('click', this.closeModal.bind(this));

        this.container.addEventListener('mousedown', (evt)=> {
            if (evt.target === evt.currentTarget)
                this.closeModal();
        } )
    }

    render(data: IModal): HTMLElement {
        super.render(data);
        this.openModal();
        return this.container;
    }

    set item(item: HTMLElement) {
        this.dataContainer.replaceChildren(item);
    }

    openModal() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    closeModal() {
        this.container.classList.remove('modal_active');
        this.events.emit('modal:close');
    }
}