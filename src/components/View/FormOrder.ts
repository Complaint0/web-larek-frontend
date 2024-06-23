import { Form, IForm } from "../common/Form";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";


export class FormOrder extends Form<IForm> {
    protected buttons: HTMLButtonElement[];

    constructor(protected form: HTMLElement, events: IEvents) {
        super(form, events);
        this.buttons = ensureAllElements<HTMLButtonElement>('.button_alt', this.form);

        this.buttons.forEach((btn) => {
            btn.addEventListener('click', (evt) => {
                this.resetBtns();
                const curBtn = evt.target as HTMLElement;
                this.toggleClass(curBtn, 'button_alt-active');
                this.events.emit(`${this.formName}:input`, { field: 'payment', value: curBtn.textContent});
            })
        })
    }

    protected resetForm(): void {
        super.resetForm();
        this.resetBtns();
    }

    protected resetBtns() {
        this.buttons.forEach((btn) => {
            this.toggleClass(btn, 'button_alt-active', false)
        })
    }

    protected getInputValues() {
        const valuesObject = super.getInputValues();
        this.buttons.forEach((btn) => {
            if (btn.classList.contains('button_alt-active')) {
                valuesObject[btn.name] = btn.textContent;
                return;
            }
        })
		return valuesObject;
    }
}