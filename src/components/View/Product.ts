import { text } from "stream/consumers";
import { IProduct } from "../../types";
import { eventNames } from "../../utils/constants";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IProductView extends IProduct {
    index: number;
}

export class Product extends Component<IProductView> {
    
    protected events: IEvents;
    protected cardTitle: HTMLElement;
    protected cardText: HTMLElement;
    protected cardPrice: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardId: string;
    protected cardCategory: HTMLElement;
    protected itemIndex: HTMLSpanElement;
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
                this.events.emit(eventNames.productSelect, { id: this.cardId })
        })

        if (this.basketButton) {
            if (this.basketButton.classList.contains('basket__item-delete'))
                {
                this.itemIndex = ensureElement<HTMLSpanElement>('.basket__item-index', this.container);
                this.basketButton.addEventListener('click', () => {
                    this.events.emit(eventNames.basketDelete, {id: this.cardId})
                })
            }
            else 
                this.basketButton.addEventListener('click', () => {
                    this.events.emit(eventNames.basketAdd)
                })
        }
    }

    set image(image: string) {
        if (this.cardImage) {
            this.setImage(this.cardImage, image, this.title)
        }
    }

    set index(index: string) {
        if(this.itemIndex)
            this.setText(this.itemIndex, index)
    }

    set description(description: string) {
        if (this.cardText)
            this.setText(this.cardText, description)
    }

    set price(price: string) {
        if (!price)
            this.setDisabled(this.basketButton, true)
        else 
            this.setDisabled(this.basketButton, false)
        this.setText(this.cardPrice, price + ' синапсов')
    }

    set category(category: string) {
        if (this.cardCategory)
            this.setText(this.cardCategory, category)
    }

    set title(title: string) {
        this.setText(this.cardTitle, title)
    }

    set id(id) {
        this.cardId = id;
    }

    get id() {
        return this.cardId;
    }
}