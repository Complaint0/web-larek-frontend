import { format } from "path";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  
};

export enum eventNames {
    productsAdd = 'products:add',
    productSelect = 'product:select',
    productSelected = 'product:selected',
    basketAdd = 'basket:add',
    basketChanged = 'basket:changed',
    basketDelete = 'basket:delete',
    basketOpen = 'basket:open',
    basketBuy = 'basket:buy',
    userAddProducts = 'user:addProducts',
    orderInput = 'order:input',
    orderFill =  'order:fill',
    contactsInput = 'contacts:input',
    contactsFill = 'contacts:fill',
    succesClose = 'succes:close',
    modalOpen = 'modal:open',
    modalClose = 'modal:close'
}

export const constraintsContacts = {
    email: {
        presence: true,
        email: {
            message: "Введите почту в формате mail@mail.com"
        },
    },
    phone: {
        presence: true,
        length: {
            maximun: 18,
            tooLong: "^Слишком длинное имя, необходимо %{count} букв или меньше",
        },
        format: {
            pattern: /\+7(\d{10})?( \(\d{3}\) [0-9]{3}-\d{2}-\d{2})?/,
            message: "Введите телефон в формате +7 (999) 999-99-99 или +79999999999"
        }
    }
}

export const constraintsOrder = {
    address: {
        presence: true,
        length: {
            minimum: 1,
            tooShort: "Введите адрес!",
        }
    },
    payment: {
        presence: true,
        length: {
            minimum: 1,
        }
    }
}