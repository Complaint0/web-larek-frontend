import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { ensureAllElements, ensureElement } from "../../utils/utils";

export interface IForm {
    valid: boolean;
    error: Record<string, string>;
}

export class Form<T> extends Component<T> { 
    protected inputs : HTMLInputElement[];
    protected submitButton: HTMLButtonElement;
    protected modalActions: HTMLDivElement;
    protected formName: string;
    protected events: IEvents;
    protected _error: HTMLElement;

    constructor(protected form: HTMLElement, events: IEvents) {
        super(form);
        this.events = events;
        this.formName = this.form.getAttribute('name');
        this.inputs = ensureAllElements<HTMLInputElement>('.form__input', this.form);
        this.modalActions = ensureElement<HTMLDivElement>('.modal__actions', this.container);
        this.submitButton =  ensureElement<HTMLButtonElement>('.button', this.modalActions);
        this._error = ensureElement('.form__errors', this.modalActions);

        this.form.addEventListener('input', (event: InputEvent) => {
            const target = event.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            this.events.emit(`${this.formName}:input`, { field, value });
        });

      
    }

    protected submitForm(evt: MouseEvent) {
        evt.preventDefault();
        this.events.emit(`${this.formName}:fill`, this.getInputValues());
        (this.container as HTMLFormElement).reset();
    }

    protected getInputValues() {
        const valuesObject: Record<string, string> = {};
		this.inputs.forEach((element) => {
			valuesObject[element.name] = element.value;
		});

		return valuesObject;
    }
    
    set error(text: string) {
        this._error.textContent = text;
    }

    set valid(isValid: Boolean) {
		this.submitButton.disabled = !isValid;
    }
}



// interface IForm {
//     valid: boolean;
//     error: Record<string, string>;
//     inputValues:  Record<string, string>;
// }

// export class Form extends Component<IForm> {
//     protected buttons: HTMLButtonElement[];
//     protected inputs : HTMLInputElement[];
//     protected submitButton: HTMLButtonElement;
//     protected formName: string;
//     protected events: IEvents;

//     constructor(protected form: HTMLElement, events: IEvents) {
//         super(form);
//         this.events = events;


//         this.formName = this.form.getAttribute('name');
//         this.buttons = ensureAllElements<HTMLButtonElement>('.button_alt', this.form);
//         this.inputs = ensureAllElements<HTMLInputElement>('.form__input', this.form);

//         this.submitButton = ensureElement<HTMLButtonElement>('.order__button', this.form);

//         this.buttons.forEach((btn) => {
//             btn.addEventListener('click', (evt) => {

//                 this.buttons.forEach((btn) => {
//                     btn.classList.remove('button_alt-active');
//                 })

//                 const curBtn = evt.target as HTMLElement;
//                 curBtn.classList.add('button_alt-active');
//             })
//         })

//         this.form.addEventListener('input', (event: InputEvent) => {
// 			const target = event.target as HTMLInputElement;
// 			const field = target.name;
// 			const value = target.value;
// 			this.events.emit(`${this.formName}:input`, { field, value });
// 		});


//         this.submitButton.addEventListener('click', (evt) => {
//             evt.preventDefault();
//             this.events.emit('order:fill', this.getInputValues());
//         })
//     }

//     set valid(isValid: Boolean) {
// 		this.submitButton.disabled = !isValid;
//     }
    
//     protected getInputValues() {
//         const valuesObject: Record<string, string> = {};
// 		this.inputs.forEach((element) => {
// 			valuesObject[element.name] = element.value;
// 		});

//         this.buttons.forEach((btn) => {
//             if (btn.classList.contains('button_alt-active')) {
//                 valuesObject[btn.name] = btn.textContent;
//                 return;
//             }
//         })

// 		return valuesObject;
//     }
// }

