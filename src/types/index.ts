export interface IProduct {
    _id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface ICatalog {
    products: IProduct[];
    curProduct: string | null;

    addProductToCatalog(product: IProduct): void;
    getProductFromCatalog(id: string): IProduct;
}

export interface IBasket {
    products: IProduct[];
    addProductToBaseket(product: IProduct): void;
    deleteProductFromBaseket(id: string): void;
    getProductsFromBasket(): IProduct[];
    getTotalFromBasket(): number;
    getCountProductsFromBasket(): number;
}

export interface IUser {
    addr: string;
    email: string;
    phone:string;
    payment: string;
    products: string[];
}

export interface IUserData {
    setUserProducts(ids: string[]): void;
    setUserPayment(userData: IUserChoosePayment): void;
    setUserEmail(userData: IUserEnterEmail): void;
    checkUserValidation(data: Record<keyof IUser, string>): boolean;
}

export type IUserChoosePayment = Pick<IUser, 'payment' | 'addr'>;
export type IUserEnterEmail = Pick<IUser, 'email' | 'phone'>; 

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    baseUrl: string;
    getCards<T>(uri: string) : Promise<T>;
    postOrder<T>(uri:string, data: object, method?: ApiPostMethods): Promise<T>;
}


