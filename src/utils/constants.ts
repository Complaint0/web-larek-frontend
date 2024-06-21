import { format } from "path";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  
};


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
            pattern: /\+7 \(\d{3}\) [0-9]{3}-\d{2}-\d{2}/,
            message: "Введите телефон в формате +7 (999) 999 99 99"
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