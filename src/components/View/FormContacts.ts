import { Form, IForm } from "../common/Form";
import { IEvents } from "../base/events";

export class FormContacts extends Form<IForm> {

    constructor(protected form: HTMLElement, events: IEvents) {
        super(form, events);
    }
}