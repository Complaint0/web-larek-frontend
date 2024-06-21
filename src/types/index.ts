export interface IProduct {
    id: string;
    image: string;
    description: string;
    title: string;
    category: string;
    price: number;
}

export interface ICatalog {
    products: IProduct[];
    curProduct: string | null;

    getProductFromCatalog(): IProduct;
}

export interface IBasket {
    addProductToBaseket(product: IProduct): void;
    deleteProductFromBaseket(id: string): void;
    getProductsFromBasket(): IProduct[];
    getTotalFromBasket(): number;
    getProductsIdsFromBasket(): string[];
    isBasketHaveProducts(): boolean;
    getCountProductsFromBasket(): string;
    clearBasket() : void;
}

export interface IUser {
    address: string;
    email: string;
    phone:string;
    payment: string;
    total: number;
    items: string[] | null;
}

export interface IUserData {
    setUserProducts(ids: string[]): void;
    getUserData(): void;
    checkOrderValidation(data: Record<keyof IUserOrder, string>): boolean
    checkContactsValidation(data: Record<keyof IUserContacts, string>): boolean
}

export type IUserOrder = Pick<IUser, 'payment' | 'address'>;
export type IUserContacts = Pick<IUser, 'email' | 'phone'>; 


export type IUserValid = Pick<IUser, 'email' | 'phone' | 'address' | 'payment'>; 


export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}