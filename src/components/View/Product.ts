import { IProduct } from "../../types";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Product extends Component<IProduct> {
    
    protected events: IEvents;
    protected cardTitle: HTMLElement;
    protected cardText: HTMLElement;
    protected cardPrice: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardId: string;
    protected cardCategory: HTMLElement;
    protected previewButton: HTMLButtonElement;
    protected basketButton: HTMLButtonElement;


    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.cardTitle = ensureElement('.card__title', this.container);
        this.cardText = this.container.querySelector('.card__text');
        this.cardPrice = ensureElement('.card__price', this.container);
        this.cardImage = this.container.querySelector('.card__image');
        this.cardCategory = this.container.querySelector('.card__category');

        this.basketButton = this.container.querySelector('.card__button');
        

        if (!this.basketButton)
            this.container.addEventListener('click', () => {
                this.events.emit('product:select', { id: this.cardId })
        })

        if (this.basketButton) {
            if (this.basketButton.classList.contains('basket__item-delete'))
                this.basketButton.addEventListener('click', () => {
                    this.events.emit('basket:delete', {id: this.cardId})
                })
            else 
                this.basketButton.addEventListener('click', () => {
                    this.events.emit('basket:add')
                })
        }
    }

    set image(image: string) {
        if (this.cardImage) {
            this.cardImage.src = image;
            this.cardImage.alt = this.title;
        }
    }

    set description(description: string) {
        if (this.cardText)
        this.cardText.textContent = description;
    }

    set price(price: string) {
        this.cardPrice.textContent = price + ' синапсов';
    }

    set category(category: string) {
        if(this.cardCategory)
        this.cardCategory.textContent = category;
    }

    set title(title: string) {
        this.cardTitle.textContent = title;
    }

    set id(id) {
        this.cardId = id;
    }

    get id() {
        return this.cardId;
    }
}