import { IApi, IProduct, IUser } from "../types";
import { ApiListResponse } from "./base/api";


type AppApiResponce = ApiListResponse<IProduct>;

export class AppApi {
    private _baseApi : IApi;
    private readonly cdn: string;

    constructor(baseApi: IApi, cdn: string) {
        this._baseApi = baseApi;
        this.cdn = cdn;
    }

    getProducts(): Promise<IProduct[]> {
        return this._baseApi.get<AppApiResponce>('/product/')
            .then((products: AppApiResponce) => 
                products['items'].map((item) => ({
                    ...item,
                    image: this.cdn + item.image
                }))
        );
    }

    sendOrder(data: IUser): Promise<IUser> {
        return this._baseApi.post<IUser>('/order', data, 'POST')
            .then((res: IUser) => res);
    }
}