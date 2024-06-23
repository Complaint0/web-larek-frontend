import validate from "validate.js";
import { IUser, IUserOrder, IUserData, IUserContacts, IUserValid } from "../types";
import { IEvents } from "./base/events";
import { constraintsContacts, constraintsOrder, eventNames } from "../utils/constants";

export class UserData implements IUserData {
    protected address: string;
    protected email: string;
    protected phone: string;
    protected payment: string;
    protected total: number
    protected items: string[] | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setTotal(total: number) {
        this.total = total;
    }

    getUserData(): IUser {
        return {address: this.address, email: this.email, total: this.total, phone: this.phone, payment: this.payment, items: this.items};
    }

    setUserProducts(ids: string[]): void {
        this.items = ids;
        this.events.emit(eventNames.userAddProducts);
    }

    checkContactsValidation(): boolean {
        if (this.email && this.phone) 
            return true;
        return false;
    }

    checkOrderValidation(): boolean {
        if (this.address && this.payment)
            return true;
        return false;
    }

    checkField(data: {field: keyof IUserValid, value: string}) {
        switch (data.field) {
            case 'email':
                return this.checkEmail(data.value);
            case "phone":
                return this.checkPhone(data.value);
            case "address":
                return this.checkAddr(data.value);
            case "payment":
                return this.checkPayment(data.value);
        }
    }


    checkEmail(value: string) {
        const result = validate.single(value, constraintsContacts.email)
        if (result) {
            this.email = '';
			return result[0];
		} else {
            this.email = value;
			return '';
		}
    }

    checkPhone(value: string) {
        const result = validate.single(value, constraintsContacts.phone)
        if (result) {
            this.phone = '';
			return result[0];
		} else {
            this.phone = value;
			return '';
		}
    }

    checkAddr(value: string) {
        const result = validate.single(value, constraintsOrder.address)
        if (result) {
            this.address = '';
			return result[0];
		} else {
            this.address = value;
			return '';
		}
    }

    checkPayment(value: string) {
        const result = validate.single(value, constraintsOrder.payment)
        if (result) {
            this.payment = '';
			return result[0];
		} else {
            this.payment = value;
			return '';
		}
    }

}